const _ = require('lodash');
const config = require('./config');
const { title, gsmAppArn, apnsAppArn } = config.get('push');

function getPushMessage({ platform, message, payload }) {
  const pushMessage = {};

  if (platform === 'android') {
    pushMessage.GCM = { data: { message, title, payload } };
  } else if (platform === 'ios') {
    pushMessage.APNS = { aps: { alert: message, payload } };
  }

  // have to stringify the inner objects and then entire payload
  _.forIn(pushMessage, (value, key) => {
    pushMessage[key] = JSON.stringify(pushMessage[key]);
  });
  return JSON.stringify(pushMessage);
}

function getPlatformApplicationArn(platform) {
  return platform === 'android' ? gsmAppArn : apnsAppArn;
}

function getLogGroup(platformApplicationArn) {
  return platformApplicationArn.replace('arn:aws:sns:', 'sns/').replace(/:/g, '/');
}

module.exports = { getPushMessage, getPlatformApplicationArn, getLogGroup };
