const debug = require('debug')('app:email');

const config = require('smart-config');
const emailConfig = config.get('email');
const { promisifyAll } = require('bluebird');
const postmark = require('postmark');
const getTemplateId = require('./get-template-id');
const getTemplateVars = require('./get-template-vars');
const client = promisifyAll(new postmark.Client(emailConfig.key));

const send = async({ email, from, to, cc, bcc, subject, message, template, vars, recipientId }) => {
  try {
    const toEmail = email || to;
    const options = {
      From: from || emailConfig.from,
      To: toEmail,
      Cc: cc,
      Bcc: bcc
    };

    if (template) {
      const templateId = getTemplateId(template);
      const resultVars = await getTemplateVars({ vars, toEmail, recipientId });

      return await client.sendEmailWithTemplateAsync({
        TemplateId: templateId,
        TemplateModel: resultVars,
        ...options
      });
    }

    return await client.sendEmailAsync({
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
