const pubSubNotifyChannel = require('./routes/pubsub-notify-channel');
const pubSubNotifyRecipient = require('./routes/pubsub-notify-recipient');
const pushNotifyRecipient = require('./routes/push-notify-recipient');
const pushNotifyToken = require('./routes/push-notify-token');
const emailNotifyAddress = require('./routes/email-notify-address');
const emailNotifyRecipient = require('./routes/email-notify-recipient');
const batchNotify = require('./routes/batch-notify');

const validate = require('../../hooks/validate');
const batchDataValidation = require('./validations/batch-notify-data');

module.exports = function () {
  const app = this;

  app.service('/provider/pubsub/channel', {
    create(data) {
      const { channel, message } = data;
      return pubSubNotifyChannel({ channel, message });
    }
  });

  app.service('/provider/pubsub/recipient', {
    create(data) {
      const { message, recipientId } = data;
      return pubSubNotifyRecipient({ message, recipientId });
    }
  });

  app.service('/provider/push/recipient', {
    create(data) {
      const { message, payload, recipientId } = data;
      return pushNotifyRecipient({ message, payload, recipientId });
    }
  });

  app.service('/provider/push/token', {
    create(data) {
      const { message, payload, token } = data;
      return pushNotifyToken({ message, payload, token });
    }
  });

  app.service('/provider/email/address', {
    create(data) {
      const { template, vars, address } = data;
      return emailNotifyAddress({ address, template, vars });
    }
  });

  app.service('/provider/email/recipient', {
    create(data) {
      const { template, vars, recipientId } = data;
      return emailNotifyRecipient({ recipientId, template, vars });
    }
  });

  app
    .service('/provider/batch', { create: batchNotify })
    .before({
      create: validate({ validation: batchDataValidation })
    });

};
