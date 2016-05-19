const RecipientProvider = require('../../recipient-provider/model');
const Promise = require('bluebird');
const _ = require('lodash');

module.exports = (app) => async({ recipientId, template, vars }) => {
  const emailHelper = require('../../../helpers/email-send')(app);

  return await _(await RecipientProvider.find({ recipientId, providerType: 'email' }))
    .pluck('address')
    .uniq('address')
    .tap(addresses => {
      return Promise.map(addresses, address => {
        return emailHelper.send(address, { template, vars });
      });
    })
    .value();
};
