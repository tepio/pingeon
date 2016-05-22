const _ = require('lodash');

module.exports = (app) => async(batch) => {
  const pushNotify = require('./provider-push-notify');
  const pubsubNotify = require('./provider-pubsub-notify-channel');
  const emailNotify = require('./email-notify-address');

  _.forEach(batch, recipient => {
    if (recipient.provider === 'push') pushNotify
  });

  return batch;
};
