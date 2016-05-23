const mandrill = require('mandrill-api/mandrill');
const toMandrillVars = require('../helpers/to-mandrill-vars');
const config = require('config');
const emailConfig = config.get('email');
const mandrillClient = new mandrill.Mandrill(emailConfig.key);

const send = (email, { template, vars }) => new Promise((resolve, reject) => {
  mandrillClient.messages.sendTemplate({
    template_name: template,
    template_content: [{}],
    message: {
      to: [{ email }],
      from_email: emailConfig.from,
      merge_vars: [{
        rcpt: email,
        vars: toMandrillVars(vars)
      }]
    },
    async: false
  }, resolve, reject);
});

module.exports = { send };
