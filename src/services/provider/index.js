const pubSubNotifyChannel = require('./routes/provider-pubsub-notify-channel');
const pushNotify = require('./routes/provider-push-notify');
const emailNotifyAddress = require('./routes/email-notify-address');
const emailNotifyRecipient = require('./routes/email-notify-recipient');

module.exports = function () {
  const app = this;

  app.service('/provider/pubsub/channel/:channel', {
    create: pubSubNotifyChannel(app)
  });

  app.service('/provider/push/recipient/:recipientId', {
    create: pushNotify(app)
  });

  app.service('/provider/email/address/:address', {
    create(data, params) {
      const { template, vars } = data;
      const { address } = params;

      return emailNotifyAddress(app)({ address, template, vars });
    }
  });

  app.service('/provider/email/recipient/:recipientId', {
    create(data, params) {
      const { template, vars } = data;
      const { recipientId } = params;

      emailNotifyRecipient(app)({ recipientId, template, vars });
    }
  });

};
