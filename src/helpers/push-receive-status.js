const debug = require('debug')('app:helpers:push-receive-status');
const Notification = require('../services/notification/model');

function saveSuccessful({ app, platformApplicationArn, providerMessageId, platform, token, message, payload }) {
  const result = {
    sendDate: new Date(),
    app,
    platformApplicationArn,
    providerMessageId,
    platform,
    token,
    message,
    payload
  };
  Notification.create(result);
  debug('push sent', result);

  return result;
}

function saveFailed({ platform, token, message, payload, error }) {
  const failedPush = { platform, token, message, payload, error };
  Notification.create(failedPush);
  debug('push sent', failedPush);
}

module.exports = { saveFailed, saveSuccessful };
