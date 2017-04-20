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

function saveFailed(push) {
  const Notification = multiDB.getModel('notifications', push.locationGroup);
  const error = { message: push.error.message, stack: push.error.stack };

  Notification.create(Object.assign({}, push, { error }));
  debug('push sent', push);
}

module.exports = { saveFailed, saveSuccessful };
