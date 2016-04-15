const debug = require('debug')('app:queue');

module.exports = function (app) {

  const queueConfig = app.get('queue');
  const queueClient = require('worque')(queueConfig.url);

  const queues = {
    PUSH_SENT: 'pushSent',
    PUSH_SENT_FAIL: 'pushSentFail'
  };

  queueClient.on('failure', debug);

  return { queueClient, ...queues };
};
