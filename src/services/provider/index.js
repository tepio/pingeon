const pubSubNotifyChannel = require('./routes/pubsub-notify-channel');
const pubSubNotifyRecipient = require('./routes/pubsub-notify-recipient');
const pubSubNotifyRecipientPrefix = require('./routes/pubsub-notify-recipient-prefix');
const pushNotifyRecipient = require('./routes/push-notify-recipient');
const pushNotifyToken = require('./routes/push-notify-token');
const emailNotifyAddress = require('./routes/email-notify-address');
const emailNotifyRecipient = require('./routes/email-notify-recipient');
const emailNotifyRecipientBatch = require('./routes/email-notify-recipient-batch');
const batchNotification = require('./routes/batch-notification');

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

  app
    .service('/provider/pubsub/recipient/prefix', {
      create(data) {
        const { message, recipientId, prefix } = data;
        return pubSubNotifyRecipientPrefix({ message, recipientId, prefix });
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
      const { template, vars, address, to, cc, bcc, message, subject } = data;
      return emailNotifyAddress({ template, vars, address, to, cc, bcc, message, subject });
    }
  });

  app.service('/provider/email/recipient/batch', {
    create: emailNotifyRecipientBatch
  });

  app.service('/provider/email/recipient', {
    create(data) {
      const { template, vars, recipientId, to, cc, bcc, message, subject } = data;
      return emailNotifyRecipient({ template, vars, recipientId, to, cc, bcc, message, subject });
    }
  });

  app
    .service('/notification/batch', { create: batchNotification })
    .before({
      create: validate({ validation: batchDataValidation })
    });

};
