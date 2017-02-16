const Recipient = require('../../services/recipient/model');

module.exports = async function (recipientId) {
  try {
    const { firstName, lastName } = await Recipient.findOne({ _id: recipientId });
    return { firstName, lastName };
  } catch (err) {
    return {};
  }
};
