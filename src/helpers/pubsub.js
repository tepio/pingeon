const debug = require('debug')('app:pubsub');

const Fanout = require('fanoutpub');
const Faye = require('faye');
const config = require('smart-config');
const pubsubConfig = config.get('pubsub');
const fanout = new Fanout.Fanout(pubsubConfig.id, pubsubConfig.key);
const faye = new Faye.Client(`http://${pubsubConfig.id}.fanoutcdn.com/bayeux`);

function pub(channel, message) {
  return new Promise((resolve, reject) =>
    fanout.publish(channel, message, (success, data, context) => {
      if (!success) return reject(context);
      const result = Object.assign({ message, channel }, context);
      debug('sent', result);
      return resolve(result);
    }));
}

function sub(channel, cb) {
  faye.subscribe('/' + channel, cb);
}

module.exports = { pub, sub };
