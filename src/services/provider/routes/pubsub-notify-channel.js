module.exports = (app) => {
  const pubsub = require('../../../providers/pubsub')(app);

  return (data, params) => {
    const message = data;
    const { channel } = params;
    
    return pubsub.pub(channel, message);
  };
};
