const pubsub = require('../../../helpers/pubsub');
const multiDB = require('mongoose-multi-connect');

module.exports = async({ prefix, recipientId, message }, params) => {
  const Recipient = multiDB.getModel('recipients', params, 'locationGroup');

  if (!await Recipient.findOne({ _id: recipientId })) {
    await Recipient.create({ _id: recipientId });
  }

  return pubsub.pub((prefix || '') + String(recipientId), message);
};
