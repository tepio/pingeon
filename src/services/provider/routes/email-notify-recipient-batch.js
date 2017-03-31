const emailNotifyRecipient = require('./email-notify-recipient');
const Promise = require('bluebird');

module.exports = (data, params) => Promise.map(data, (email) => emailNotifyRecipient(email, params));
