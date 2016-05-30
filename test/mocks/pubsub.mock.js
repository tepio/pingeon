const EventEmitter = require('events');
const emitter = new EventEmitter();

async function pub(channel, message) {
  emitter.emit(channel, message);
  return { message, channel, statusCode: 200 };
}

function sub(channel, cb) {
  emitter.on(channel, cb);
}

module.exports = { pub, sub };
