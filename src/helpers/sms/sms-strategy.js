const Twilio = require('twilio');
const httpError = require('http-errors');
const smsConfig = require('smart-config').get('sms');

module.exports = (config = smsConfig) => {
  return { send: sendSms(config) };
};

function sendSms(config) {
  const client = new Twilio(config.accountSid, config.authToken);
  return async (message, recipientNumber) => {
    try {
      await client.messages.create({
        body: message,
        to: recipientNumber,
        from: config.fromNumber
      });
      return { status: 'OK' };
    } catch (err) {
      throw httpError(err.status, err.message);
    }
  };
}

