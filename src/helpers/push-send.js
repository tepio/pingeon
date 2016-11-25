const { promisifyAll } = require('bluebird');

const config = require('smart-config');
const { key, secret, region } = config.get('push');

const awsUtils = require('../helpers/aws-utils');
const pushReceiveStatus = require('../helpers/push-receive-status');

const AWS = require('aws-sdk');
AWS.config.update({ accessKeyId: key, secretAccessKey: secret, region });
const sns = promisifyAll(new AWS.SNS());

async function send({ platform, token, message, payload }) {
  try {

    const platformApplicationArn = awsUtils.getPlatformApplicationArn(platform);
    const pushMessage = awsUtils.getPushMessage({ platform, message, payload });

    const { EndpointArn } = await sns.createPlatformEndpointAsync({
      PlatformApplicationArn: platformApplicationArn, Token: token
    });

    await sns.setEndpointAttributesAsync({ Attributes: { Enabled: 'true' }, EndpointArn });

    const { MessageId } = await sns.publishAsync({
      Message: pushMessage, MessageStructure: 'json',
      TargetArn: EndpointArn
    });
    
    return pushReceiveStatus.saveSuccessful({
      platformApplicationArn,
      providerMessageId: MessageId,
      platform, token, message, payload
    });
  } catch (error) {
    if (awsUtils.isOldToken(error)) return awsUtils.deleteOldToken(token);
    pushReceiveStatus.saveFailed({ platform, token, message, payload, error });
    throw error;
  }
}

module.exports = { send };
