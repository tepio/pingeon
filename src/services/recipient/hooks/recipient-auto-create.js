const _ = require('lodash');
const Recipient = require('../../recipient/model');

module.exports = () => async(hook) => {
  const recipientId = _.get(hook, 'params.recipientId') || _.get(hook, 'data.recipientId');
  const { firstName, lastName } = hook.data;
  if (!recipientId) return hook;

  if (!await Recipient.findOne({ _id: recipientId })) {
    await Recipient.create({ _id: recipientId, firstName, lastName });
  }

  return hook;
};
