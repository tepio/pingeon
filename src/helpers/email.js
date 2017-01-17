const debug = require('debug')('app:email');

const mandrill = require('mandrill-api/mandrill');
const { getVars, getTo } = require('./mandrill-utils');
const config = require('smart-config');
const emailConfig = config.get('email');
const mandrillClient = new mandrill.Mandrill(emailConfig.key);

const send = ({ email, to, cc, bcc, subject, message, template, vars }) => new Promise((resolve, reject) => {
  const mandrillMessage = {
    subject,
    to: getTo({ email, to, cc, bcc }),
    from_email: emailConfig.from,
    merge_vars: [{
      rcpt: email,
      vars: getVars(vars)
    }]
  };

  if (template) {
    return mandrillClient.messages.sendTemplate({
      template_name: template,
      template_content: [{}],
      message: mandrillMessage,
      async: false
    }, res => {
      debug('sent', res);
      resolve(res);
    }, err => {
      debug('error', err);
      reject(err);
    });
  }

  return mandrillClient.messages.send({
    message: { ...mandrillMessage, html: message },
    async: false
  }, res => {
    debug('sent', res);
    resolve(res);
  }, err => {
    debug('error', err);
    reject(err);
  });
});

module.exports = { send };
