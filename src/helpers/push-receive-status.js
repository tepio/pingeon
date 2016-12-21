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

function saveFailed({ error, ...failedPush }) {
  error = { message: error.message, stack: error.stack };

  Notification.create({ error, ...failedPush });
  debug('push sent', failedPush);
}

module.exports = { saveFailed, saveSuccessful };
