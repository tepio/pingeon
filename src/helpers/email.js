const mandrill = require('mandrill-api/mandrill');
const { getVars, getTo } = require('./mandrill-utils');
const config = require('./config');
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
    }, resolve, reject);
  }

  return mandrillClient.messages.send({
    message: { ...mandrillMessage, text: message },
    async: false
  }, resolve, reject);
});

module.exports = { send };
