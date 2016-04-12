const pubSubNotifyRecipient = require('./routes/pubsub-notify-recipient');
const pubSubNotifyChannel = require('./routes/pubsub-notify-channel');
const emailNotify = require('./routes/email-notify');

module.exports = function () {
  const app = this;

  app.service('/provider/pubsub/notify/recipient/:recipientId', {
    create: pubSubNotifyRecipient(app)
  });

  app.service('/provider/pubsub/notify/channel/:channel', {
    create: pubSubNotifyChannel(app)
  });

  app.service('/provider/email/notify', {
    create: emailNotify(app)
  });

};
