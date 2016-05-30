const RecipientProvider = require('../model');

module.exports = ({ recipientId, deviceId }) => {
  return RecipientProvider.findOneAndRemove({ recipientId, deviceId });
};
