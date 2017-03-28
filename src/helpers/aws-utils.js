const _ = require('lodash');
const config = require('smart-config');
const { title, appsArns, defaultApp } = config.get('push');
const debug = require('debug')('app:helpers:aws-utils');
const multiDB = require('mongoose-multi-connect');

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

function getPlatformApplicationArn(app) {
  app = _.get(app, 'name') || app || defaultApp;

  const appArn = appsArns[app];
  if (!appArn) throw new Error('No ARN for the app ' + app);
  return appArn;
}

function getLogGroup(platformApplicationArn) {
  return platformApplicationArn.replace('arn:aws:sns:', 'sns/').replace(/:/g, '/');
}

function isOldToken(error) {
  return error && error.message === 'Invalid parameter: This endpoint is already registered with a different token.';
}

async function deleteOldToken(token, locationGroup) {
  try {
    const RecipientProfile = multiDB.getModel('recipientprofiles', locationGroup);
    await RecipientProfile.remove({ token });
    debug('Deleted old token', token);
  } catch (err) {
    debug('Delete token error', err);
  }
}

module.exports = { getPushMessage, getPlatformApplicationArn, getLogGroup, isOldToken, deleteOldToken };
