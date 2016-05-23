const EventEmitter = require('events');
const emitter = new EventEmitter();

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

module.exports = { pub, sub };
