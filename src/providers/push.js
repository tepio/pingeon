const { promisifyAll } = require('bluebird');
const AWS = require('aws-sdk');

module.exports = function (app) {

  const { key, secret, region } = app.get('push');
  const awsUtils = require('../helpers/aws-utils')(app);
  AWS.config.update({ accessKeyId: key, secretAccessKey: secret, region });
  const sns = promisifyAll(new AWS.SNS());
  const { queueClient, PUSH_SENT, PUSH_SENT_FAIL } = require('../helpers/queue')(app);

  const awsSend = async({ platform, token, message, payload }) => {
    const PlatformApplicationArn = awsUtils.getPlatformApplicationArn(platform);
    const Message = awsUtils.getPushMessage({ platform, message, payload });

    const { EndpointArn } = await sns.createPlatformEndpointAsync({
      PlatformApplicationArn, Token: token,
      Attributes: { Enabled: 'true' }
    });

    const { MessageId } = await sns.publishAsync({
      Message, MessageStructure: 'json',
      TargetArn: EndpointArn
    });

    return {
      sendDate: new Date(),
      PlatformApplicationArn,
      providerMessageId: MessageId,
      platform, token, message, payload
    };
  };

  const send = async(opts) => {
    try {
      const result = await awsSend(opts);
      
      queueClient(PUSH_SENT).publish(result);
      return result;
    } catch (err) {
      queueClient(PUSH_SENT_FAIL).publish(err);
      throw err;
    }
  };

  return { send };
};
