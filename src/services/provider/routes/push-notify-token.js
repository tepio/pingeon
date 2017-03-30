const multiDB = require('mongoose-multi-connect');
const pushHelper = require('../../../helpers/push-send');
const { get } = require('lodash');

module.exports = async({ token, message, payload, platform, deviceId, app }, params) => {
  const locationGroup = get(params, 'locationGroup');
  const Notification = multiDB.getModel('notifications', locationGroup);
  const push = { token, message, payload, platform, deviceId, app, locationGroup };
  await Notification.create(push);

  return await pushHelper.send(push);
};
