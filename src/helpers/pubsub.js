const Fanout = require('fanoutpub');
const Faye = require('faye');

module.exports = function (app) {
  
  const pubsubConfig = app.get('pubsub');
  const fanout = new Fanout.Fanout(pubsubConfig.id, pubsubConfig.key);
  const faye = new Faye.Client(`http://${pubsubConfig.id}.fanoutcdn.com/bayeux`);
  
  function pub(channel, message) {
    return new Promise((resolve, reject) =>
      fanout.publish(channel, message, (success, data, context) => {
        if (!success) return reject(context);

        return resolve({ message, channel, ...context });
      }));
  }

  function sub(channel) {
    return new Promise(resolve =>
      faye.subscribe('/' + channel, message => {
        resolve(message);
      }));
  }

  return { pub, sub };
};
