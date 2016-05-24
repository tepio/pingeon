const _ = require('lodash');
const statusError = require('http-errors');

const pushNotifyRecipient = require('./push-notify-recipient');
const pushNotifyToken = require('./push-notify-token');
const pubsubNotifyChannel = require('./pubsub-notify-channel');
const pubsubNotifyRecipient = require('./pubsub-notify-recipient');
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

    if (provider === 'push') {
      if (data.token) return await pushNotifyToken(args);
      if (data.recipientId) return await pushNotifyRecipient(args);
    }

    if (provider === 'pubsub') {
      if (data.channel) return await pubsubNotifyChannel(args);
      if (data.recipientId) return await pubsubNotifyRecipient(args);
    }

    throw statusError(400, 'Invalid provider');
  });

  return { status: 'queued' };
};
