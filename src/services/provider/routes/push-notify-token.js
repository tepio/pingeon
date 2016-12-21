const Notification = require('../../notification/model');
const pushHelper = require('../../../helpers/push-send');

module.exports = async({ token, message, payload, platform, deviceId, app }) => {
  const push = { token, message, payload, platform, deviceId, app };
  await Notification.create(push);

  return await pushHelper.send(push);
};
