const multiDB = require('mongoose-multi-connect');

module.exports = async function (recipientId, locationGroup) {
  try {
    const Recipient = multiDB.getModel('recipients', locationGroup);
    const { firstName, lastName } = await Recipient.findOne({ _id: recipientId });
    return { firstName, lastName };
  } catch (err) {
    return {};
  }
};
