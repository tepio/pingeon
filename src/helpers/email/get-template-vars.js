const defaultVars = require('smart-config').get('email.defaultVars') || {};
const getRecipientNameParts = require('./get-recipient-name-parts');

module.exports = async function ({ vars = {}, recipientId, toEmail, locationGroup }) {
  const nameParts = await getRecipientNameParts(recipientId, locationGroup);
  const generatedVars = Object.assign({
    currentYear: new Date().getFullYear(), toEmail
  }, nameParts);
  return Object.assign({}, defaultVars, generatedVars, vars);
};
