const pubSubNotifyChannel = require('./routes/pubsub-notify-channel');
const pubSubNotifyRecipient = require('./routes/pubsub-notify-recipient');
const pubSubNotifyRecipientPrefix = require('./routes/pubsub-notify-recipient-prefix');
const pushNotifyRecipient = require('./routes/push-notify-recipient');
const pushNotifyToken = require('./routes/push-notify-token');
const emailNotifyAddress = require('./routes/email-notify-address');
const emailNotifyRecipient = require('./routes/email-notify-recipient');
const emailNotifyRecipientBatch = require('./routes/email-notify-recipient-batch');
const batchNotification = require('./routes/batch-notification');
const smsNotifyRecipient = require('./routes/sms-notify-recipient');

const validate = require('../../hooks/validate');
const batchDataValidation = require('./validations/batch-notify-data');

module.exports = function () {
  const app = this;

  app.service('/provider/pubsub/channel', { create: pubSubNotifyChannel });

  app.service('/provider/pubsub/recipient', { create: pubSubNotifyRecipient });

  app.service('/provider/pubsub/recipient/prefix', { create: pubSubNotifyRecipientPrefix });

  app.service('/provider/push/recipient', { create: pushNotifyRecipient });

  app.service('/provider/push/token', { create: pushNotifyToken });

  app.service('/provider/email/address', { create: emailNotifyAddress });

  app.service('/provider/email/recipient/batch', { create: emailNotifyRecipientBatch });

  app.service('/provider/email/recipient', { create: emailNotifyRecipient });

  app.service('/provider/sms/recipient', { create: smsNotifyRecipient });

  app
    .service('/notification/batch', { create: batchNotification })
    .before({ create: validate({ validation: batchDataValidation }) });

};
