const debug = require('debug')('app:email');

const config = require('smart-config');
const emailConfig = config.get('email');
const { promisifyAll } = require('bluebird');
const postmark = require('postmark');
const getTemplateId = require('./get-template-id');
const getTemplateVars = require('./get-template-vars');
const client = promisifyAll(new postmark.Client(emailConfig.key));

const send = async ({ email, from, to, cc, bcc, subject, message, template, vars, recipientId, locationGroup }) => {
  try {
    const toEmail = email || to;

    let fromEmail = from || emailConfig.from;
    if (emailConfig.from_label && emailConfig.from_label.search('[email]') !== -1) {
      fromEmail = emailConfig.from_label.replace('[email]', from || emailConfig.from);
    }
    
    const options = {
      From: fromEmail,
      To: toEmail, Cc: cc, Bcc: bcc
    };

    if (template) {
      const templateId = getTemplateId(template);
      const resultVars = await getTemplateVars({ vars, toEmail, recipientId, locationGroup });

      return await client.sendEmailWithTemplateAsync(Object.assign({
        TemplateId: templateId,
        TemplateModel: resultVars,
      }, options));
    }

    return await client.sendEmailAsync(Object.assign({
      TextBody: message,
      Subject: subject
    }, options));

  } catch (err) {
    debug(err, { locationGroup });
    return err;
  }
};

module.exports = { send };
