const debug = require('debug')('app:email-notify-recipient');
const RecipientProfile = require('../../recipient-profile/model');
const Recipient = require('../../recipient/model');
const emailHelper = require('../../../helpers/email');
const Promise = require('bluebird');
const _ = require('lodash');

async function addRecipientNameToVars(recipientId, vars) {
  try {
    const { firstName, lastName } = await Recipient.findOne({ _id: recipientId });
    const nameVars = { FIRST_NAME: firstName, LAST_NAME: lastName };
    return Object.assign({}, nameVars, vars);
  } catch (err) {
    debug(err);
    return vars;
  }
}

module.exports = async({ template, vars, recipientId, to, cc, bcc, message, subject }) => {
  const resultVars = await addRecipientNameToVars(recipientId, vars);

  let res = await RecipientProfile.findOne({ recipientId, providerType: 'email' });
  res = _.map(res, 'address');
  res = _.uniq(res);
  res = await Promise.map(res, address => {
    return emailHelper.send({
      email: address, vars: resultVars,
      template, to, cc, bcc, message, subject
    });
  });
  res = _.flatten(res);

  return res;
};
