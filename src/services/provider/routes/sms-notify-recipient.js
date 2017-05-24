const smsClient = require('../../../helpers/sms');

module.exports = ({ body, recipientNumber }) => {
  return smsClient().send(body, recipientNumber);
};
