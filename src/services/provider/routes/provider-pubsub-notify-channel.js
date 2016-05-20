module.exports = (app) => {
  const pubsub = require('../../../helpers/pubsub')(app);

  return ({ channel, message }) => {
    return pubsub.pub(channel, message);
  };
};
