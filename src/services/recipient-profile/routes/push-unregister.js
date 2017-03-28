const multiDB = require('mongoose-multi-connect');

module.exports = function ({ recipientId, deviceId }, params) {
  const RecipientProvider = multiDB.getModel('recipientprofiles', params, 'locationGroup');
  return RecipientProvider.findOneAndRemove({ recipientId, deviceId });
};
