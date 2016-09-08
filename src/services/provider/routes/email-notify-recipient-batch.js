const emailNotifyRecipient = require('./email-notify-recipient');
const Promise = require('bluebird');

module.exports = (data) => Promise.map(data, emailNotifyRecipient);
