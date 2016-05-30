const Recipient = require('../../recipient/model');

module.exports = () => async(hook) => {
  const { recipientId } = hook.params;
  if (!recipientId) return hook;
  
  if (!await Recipient.findOne({ _id: recipientId })) {
    await Recipient.create({ _id: recipientId });
  }

  return hook;
};
