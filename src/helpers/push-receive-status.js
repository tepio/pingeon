const debug = require('debug')('app:helpers:push-receive-status');
const multiDB = require('mongoose-multi-connect');

function saveSuccessful({
  app, platformApplicationArn, providerMessageId,
  platform, token, message, payload, locationGroup
}) {
  const Notification = multiDB.getModel('notifications', locationGroup);

  const result = {
    sendDate: new Date(),
    app,
    platformApplicationArn,
    providerMessageId,
    platform,
    token,
    message,
    payload,
    locationGroup
  };
  Notification.create(result);
  debug('push sent', result);

  return result;
}

function saveFailed({ error, locationGroup, ...failedPush }) {
  const Notification = multiDB.getModel('notifications', locationGroup);
  error = { message: error.message, stack: error.stack };

  Notification.create({ error, locationGroup, ...failedPush });
  debug('push sent', failedPush);
}

module.exports = { saveFailed, saveSuccessful };
