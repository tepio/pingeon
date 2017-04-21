const pubsub = require('../../../helpers/pubsub');

module.exports = ({ channel, message, service }) => {
  return pubsub(service).pub(channel, message);
};
