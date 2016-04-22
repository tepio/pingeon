const pubSubNotifyChannel = require('./routes/provider-pubsub-notify-channel');
const pushNotify = require('./routes/provider-push-notify');

module.exports = function () {
  const app = this;
  
  app.service('/provider/pubsub/channel/:channel', {
    create: pubSubNotifyChannel(app)
  });

  app.service('/provider/push/recipient/:recipientId', {
    create: pushNotify(app)
  });

};
