const EventEmitter = require('events');
const emitter = new EventEmitter();

module.exports = function () {

  async function pub(channel, message) {
    emitter.emit(channel, message);
    return { message, channel, statusCode: 200 };
  }

  function sub(channel) {
    return new Promise(resolve =>
      emitter.on(channel, message => {
        resolve(message);
      }));
  }

  return { pub, sub };
};
