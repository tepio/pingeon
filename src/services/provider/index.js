const pubSubNotifyChannel = require('./routes/provider-pubsub-notify-channel');
const pushNotify = require('./routes/provider-push-notify');
const emailNotifyAddress = require('./routes/email-notify-address');
const emailNotifyRecipient = require('./routes/email-notify-recipient');

module.exports = function () {
  const app = this;

  app.service('/provider/pubsub/channel', {
    create(data) {
      const { channel, message } = data;
      return pubSubNotifyChannel(app)({ channel, message });
    }
  });

  app.service('/provider/push/recipient/:recipientId', {
    create: pushNotify(app)
  });

  app.service('/provider/email/address', {
    create(data) {
      const { template, vars, address } = data;
      return emailNotifyAddress(app)({ address, template, vars });
    }
  });

  app.service('/provider/email/recipient', {
    create(data) {
      const { template, vars, recipientId } = data;
      return emailNotifyRecipient(app)({ recipientId, template, vars });
    }
  });

};
