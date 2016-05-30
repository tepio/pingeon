const RecipientProfile = require('../../recipient-profile/model');
const emailHelper = require('../../../helpers/email');
const Promise = require('bluebird');
const _ = require('lodash');

module.exports = async({ recipientId, template, vars }) => {
  let res = await RecipientProfile.find({ recipientId, providerType: 'email' });
  res = _.map(res, 'address');
  res = _.uniq(res);
  res = await Promise.map(res, address => {
    return emailHelper.send({ email: address, template, vars });
  });
  res = _.flatten(res);

  return res;
};
