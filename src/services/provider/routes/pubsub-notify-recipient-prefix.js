const pubsub = require('../../../helpers/pubsub');
const Recipient = require('../../recipient/model');

module.exports = async({ prefix, recipientId, message }) => {
  if (!await Recipient.findOne({ _id: recipientId })) {
    await Recipient.create({ _id: recipientId });
  }

  return pubsub.pub((prefix || '') + String(recipientId), message);
};
