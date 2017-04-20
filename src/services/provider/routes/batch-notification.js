const _ = require('lodash');

const pushNotifyRecipient = require('./push-notify-recipient');
const pushNotifyToken = require('./push-notify-token');
const pubsubNotifyChannel = require('./pubsub-notify-channel');
const pubsubNotifyRecipient = require('./pubsub-notify-recipient');
const pubsubNotifyRecipientPrefix = require('./pubsub-notify-recipient-prefix');
const emailNotifyAddress = require('./email-notify-address');
const emailNotifyRecipient = require('./email-notify-recipient');

module.exports = async (batch, params) => {
  const push = batch.providers.push;
  const pubsub = batch.providers.pubsub;
  const email = batch.providers.email;

  _(push).get('tokens', [])
    .forEach(async token => await pushNotifyToken(_.assign({ token }, push), params));

  _(pubsub).get('channels', [])
    .forEach(async channel => await pubsubNotifyChannel(_.assign({ channel }, pubsub)));

  _(email).get('addresses', [])
    .forEach(async address => await emailNotifyAddress(_.assign({ address }, email)));

  _.forEach(batch.recipients, (recipientId) => {
    if (push) pushNotifyRecipient(_.assign({ recipientId }, push), params);
    if (email) emailNotifyRecipient(_.assign({ recipientId }, email), params);
    if (pubsub) {
      if (pubsub.prefix) pubsubNotifyRecipientPrefix(_.assign({ recipientId }, pubsub), params);
      else pubsubNotifyRecipient(_.assign({ recipientId }, pubsub), params);
    }
  });

  return { status: 'queued' };
};
