const debug = require('debug')('app:queue');
const config = require('config');
const queueConfig = config.get('queue');
const queueClient = require('worque')(queueConfig.url);

const queues = {
  PUSH_SENT: 'pushSent',
  PUSH_SENT_FAIL: 'pushSentFail'
};

queueClient.on('failure', debug);

module.exports = { queueClient, ...queues };
