const pubsub = require('../../../helpers/pubsub');
const multiDB = require('mongoose-multi-connect');
const Promise = require('bluebird');
const _ = require('lodash');

module.exports = async({ recipientId, message, service }, params) => {
  const RecipientProfile = multiDB.getModel('recipientprofiles', params, 'locationGroup');
  let res = await RecipientProfile.find({ recipientId, providerType: 'pubsub' });
  res = _.map(res, 'address');
  res = _.uniq(res);
  res = await Promise.map(res, address => {
    return pubsub(service).pub(address, message);
  });
  res = _.flatten(res);

  return res;
};
