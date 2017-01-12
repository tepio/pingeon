const debug = require('debug')('app:email');

const config = require('smart-config');
const emailConfig = config.get('email');
const { promisifyAll } = require('bluebird');
const postmark = require('postmark');
const client = promisifyAll(new postmark.Client(emailConfig.key));

const send = ({ email, to, cc, bcc, subject, message, template, vars }) => {

  const defaultVars = {
    to_email: email || to,
    current_year: new Date().getFullYear()
  };

  try {
    const options = {
      From: emailConfig.from,
      To: email || to,
      Cc: cc,
      Bcc: bcc
    };

    if (template) {
      return client.sendEmailWithTemplateAsync({
        TemplateId: template,
        TemplateModel: { ...emailConfig.defaultVars, ...defaultVars, ...vars },
        ...options
      });
    }

    return client.sendEmailAsync({
      TextBody: message,
      Subject: subject,
      ...options
    });

  } catch (err) {
    debug(err);
    return err;
  }

};

module.exports = { send };
