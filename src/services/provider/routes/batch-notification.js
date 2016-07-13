const _ = require('lodash');

const pushNotifyRecipient = require('./push-notify-recipient');
const pushNotifyToken = require('./push-notify-token');
const pubsubNotifyChannel = require('./pubsub-notify-channel');
const pubsubNotifyRecipient = require('./pubsub-notify-recipient');
const pubsubNotifyRecipientPrefix = require('./pubsub-notify-recipient-prefix');
const emailNotifyAddress = require('./email-notify-address');
const emailNotifyRecipient = require('./email-notify-recipient');

module.exports = async(batch) => {
  const push = batch.providers.push;
  const pubsub = batch.providers.pubsub;
  const email = batch.providers.email;

  _(push).get('tokens', [])
    .forEach(async token => await pushNotifyToken({ token, ...push }));

  _(pubsub).get('channels', [])
    .forEach(async channel => await pubsubNotifyChannel({ channel, ...pubsub }));

  _(email).get('addresses', [])
    .forEach(async address => await emailNotifyAddress({ address, ...email }));

  _.forEach(batch.recipients, recipientId => {
    if (push) pushNotifyRecipient({ recipientId, ...push });
    if (email) emailNotifyRecipient({ recipientId, ...email });
    if (pubsub) {
      if (pubsub.prefix) pubsubNotifyRecipientPrefix({ recipientId, ...pubsub });
      else pubsubNotifyRecipient({ recipientId, ...pubsub });
    }
  });

  return { status: 'queued' };
};
