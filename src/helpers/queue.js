const debug = require('debug')('app:queue');
const config = require('smart-config');
const queueConfig = config.get('amqp');
const queueClient = require('worque')(queueConfig.url);

const queues = {
  PUSH_SENT: 'pushSent',
  PUSH_SENT_FAIL: 'pushSentFail'
};

queueClient.on('failure', debug);

module.exports = { queueClient, ...queues };
