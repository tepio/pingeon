const pubsub = require('../../../helpers/pubsub');

module.exports = ({ channel, message }) => {
  return pubsub.pub(channel, message);
};
