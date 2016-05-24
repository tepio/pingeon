const pubsub = require('../../../helpers/pubsub');
const RecipientProvider = require('../../recipient-provider/model');
const Promise = require('bluebird');
const _ = require('lodash');

module.exports = async({ recipientId, message }) => {
  let res = await RecipientProvider.find({ recipientId, providerType: 'pubsub' });
  res = _.map(res, 'address');
  res = _.uniq(res);
  res = await Promise.map(res, address => {
    return pubsub.pub(address, message);
  });
  res = _.flatten(res);

  return res;
};
