const defaultVars = require('smart-config').get('email.defaultVars');
const getRecipientNameParts = require('./get-recipient-name-parts');

module.exports = async function ({ vars, recipientId, toEmail }) {
  const nameParts = await getRecipientNameParts(recipientId);
  const generatedVars = {
    currentYear: new Date().getFullYear(),
    ...nameParts, toEmail
  };
  return { ...defaultVars, ...generatedVars, ...vars };
};

