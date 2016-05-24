const _ = require('lodash');
const statusError = require('http-errors');

const pushNotify = require('./push-notify-recipient');
const pubsubNotify = require('./pubsub-notify-channel');
const emailNotifyAddress = require('./email-notify-address');
const emailNotifyRecipient = require('./email-notify-recipient');

module.exports = async(batch) => {
  if (_.isEmpty(batch.recipients)) throw statusError(400, 'No recipients');

  _.forEach(batch.recipients, async({ provider, data }) => {
    const args = { ...data, message: batch.message };
    if (provider === 'email') {
      if (data.address) return await emailNotifyAddress(args);
      if (data.recipientId) return await emailNotifyRecipient(args);
    }
    if (provider === 'push') return await pushNotify(args);
    if (provider === 'pubsub') return await pubsubNotify(args);

    throw statusError(400, 'Invalid provider');
  });

  return { status: 'queued' };
};
