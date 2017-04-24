const debug = require('debug')('app:pubsub');
const httpError = require('http-errors');
const Fanout = require('fanoutpub');
const Faye = require('faye');
const fanoutConfig = require('smart-config').get('pubsub');

module.exports = (config = fanoutConfig) => {
  return { pub: pub(config), sub: sub(config) };
};

function pub(config) {
  const fanout = new Fanout.Fanout(config.id, config.key);

  return (channel, message) => {
    return new Promise((resolve, reject) =>
      fanout.publish(channel, message, (success, data, context) => {
        if (!success) return reject(httpError(context.statusCode, context.httpBody));
        const result = Object.assign({ message, channel }, context);

        debug('sent', result);
        return resolve(result);
      }));
  };
}

function sub(config) {
  const faye = new Faye.Client(`http://${config.id}.fanoutcdn.com/bayeux`);

  return (channel, cb) => {
    faye.subscribe('/' + channel, cb);
  };
}
