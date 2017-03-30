const _ = require('lodash');
const multiDB = require('mongoose-multi-connect');

module.exports = () => async function (hook) {
  const recipientId = _.get(hook, 'params.recipientId') || _.get(hook, 'data.recipientId');
  const { firstName, lastName } = hook.data;
  if (!recipientId) return hook;

  const Recipient = multiDB.getModel('recipients', hook, 'params.locationGroup');
  const recipient = await Recipient.findOne({ _id: recipientId });

  if (!recipient) {
    await Recipient.create({ _id: recipientId, firstName, lastName });
  }

  return hook;
};
