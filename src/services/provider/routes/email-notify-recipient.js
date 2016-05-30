const RecipientProvider = require('../../recipient-profile/model');
const emailHelper = require('../../../helpers/email-send');
const Promise = require('bluebird');
const _ = require('lodash');

module.exports = async({ recipientId, template, vars }) => {
  let res = await RecipientProvider.find({ recipientId, providerType: 'email' });
  res = _.map(res, 'address');
  res = _.uniq(res);
  res = await Promise.map(res, address => {
    return emailHelper.send(address, { template, vars });
  });
  res = _.flatten(res);

  return res;
};
