const debug = require('debug')('app:push');

const { promisifyAll } = require('bluebird');

const config = require('./config');
const { key, secret, region } = config.get('push');

const awsUtils = require('../helpers/aws-utils');

const AWS = require('aws-sdk');
AWS.config.update({ accessKeyId: key, secretAccessKey: secret, region });
const sns = promisifyAll(new AWS.SNS());

async function awsSend({ platform, token, message, payload }) {

  const platformApplicationArn = awsUtils.getPlatformApplicationArn(platform);
  const pushMessage = awsUtils.getPushMessage({ platform, message, payload });

  const { EndpointArn } = await sns.createPlatformEndpointAsync({
    PlatformApplicationArn: platformApplicationArn,
    Token: token, Attributes: { Enabled: 'true' }
  });

  const { MessageId } = await sns.publishAsync({
    Message: pushMessage, MessageStructure: 'json',
    TargetArn: EndpointArn
  });

  return {
    sendDate: new Date(),
    platformApplicationArn,
    providerMessageId: MessageId,
    platform, token, message, payload
  };
}

async function send(opts) {
  try {
    const result = await awsSend(opts);
    debug('sent', result);

    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = { send };
