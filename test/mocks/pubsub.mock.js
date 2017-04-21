const EventEmitter = require('events');
const emitter = new EventEmitter();

module.exports = (config) => {
  return {
    pub: async (channel, message) => {
      emitter.emit(channel, message);
      emitter.emit('config', config);
      return { config, message, channel, statusCode: 200 };
    },
    sub: (channel, cbMessage, cbConfig) => {
      emitter.on(channel, cbMessage);
      if (cbConfig) emitter.on('config', cbConfig);
    }
  };
};
