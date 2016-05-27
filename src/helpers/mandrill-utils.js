const _ = require('lodash');

function getTo({ email, to, cc, bcc }) {
  const singleEmail = email ? [{ email }] : [];
  const toEmails = _.map(to, email => ({ email }));
  const ccEmails = _.map(cc, email => ({ email, type: 'cc' }));
  const bccEmails = _.map(bcc, email => ({ email, type: 'bcc' }));

  return [...singleEmail, ...toEmails, ...ccEmails, ...bccEmails];
}

function getVars(vars) {
  const result = [];
  _.mapKeys(vars, (val, key) => {
    result.push({ name: key, content: val });
  });
  return result;
}

module.exports = { getTo, getVars };
