const debug = require('debug')('app:email-notify-recipient');
const RecipientProfile = require('../../recipient-profile/model');
const emailHelper = require('../../../helpers/email');
const Promise = require('bluebird');
const _ = require('lodash');

module.exports = async({ recipientId, ...otherConfig }) => {
  let res = await RecipientProfile.findOne({ recipientId, providerType: 'email' });
  if (!res) {
    debug('Recipient is not registered', { recipientId });
    return { status: 'no recipient', recipientId };
  }
  res = _.map(res, 'address');
  res = _.uniq(res);
  res = await Promise.map(res, address => {
    return emailHelper.send({
      email: address, recipientId, ...otherConfig
    });
  });
  res = _.flatten(res);

  return res;
};
