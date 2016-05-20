const RecipientProvider = require('../../recipient-provider/model');
const Promise = require('bluebird');
const _ = require('lodash');

module.exports = (app) => async({ recipientId, template, vars }) => {
  const emailHelper = require('../../../helpers/email-send')(app);

  let res = await RecipientProvider.find({ recipientId, providerType: 'email' });
  res = _.map(res, 'address');
  res = _.uniq(res);
  res = await Promise.map(res, address => {
    return emailHelper.send(address, { template, vars });
  });
  res = _.flatten(res);

  return res;
};
