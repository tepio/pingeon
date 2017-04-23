const multiDB = require('mongoose-multi-connect');
const errors = require('feathers-errors');

module.exports = async function ({ recipientId, deviceId }, params) {
  const RecipientProvider = multiDB.getModel('recipientprofiles', params, 'locationGroup');
  const result = await RecipientProvider.findOneAndRemove({ recipientId, deviceId });

  if (!result) throw new errors.NotFound('No such recipient.');
  return result;
};
