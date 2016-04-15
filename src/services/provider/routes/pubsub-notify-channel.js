module.exports = (app) => {
  const pubsub = require('../../../helpers/pubsub')(app);

  return (data, params) => {
    const message = data;
    const { channel } = params;
    
    return pubsub.pub(channel, message);
  };
};
