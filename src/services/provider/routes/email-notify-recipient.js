const debug = require('debug')('app:email-notify-recipient');
const RecipientProfile = require('../../recipient-profile/model');
const Recipient = require('../../recipient/model');
const emailHelper = require('../../../helpers/email');
const Promise = require('bluebird');
const _ = require('lodash');

async function addRecipientNameToVars(recipientId, vars) {
  try {
    const recipient = await Recipient.findOne({ _id: recipientId });
    const { firstName, lastName } = recipient;
    const nameVars = { FIRST_NAME: firstName, LAST_NAME: lastName };
    return Object.assign({}, nameVars, vars);
  } catch (err) {
    debug(err);
    return vars;
  }
}

module.exports = async({ recipientId, template, vars }) => {
  const resultVars = await addRecipientNameToVars(recipientId, vars);

  let res = await RecipientProfile.findOne({ recipientId, providerType: 'email' });
  res = _.map(res, 'address');
  res = _.uniq(res);
  res = await Promise.map(res, address => {
    return emailHelper.send({ email: address, template, vars: resultVars });
  });
  res = _.flatten(res);

  return res;
};
