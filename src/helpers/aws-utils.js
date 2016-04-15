const _ = require('lodash');

module.exports = function (app) {

  const { title, gsmAppArn, apnsAppArn } = app.get('push');

  const getPushMessage = ({ platform, message, payload }) => {
    const pushMessage = {};

    if (platform === 'android') {
      pushMessage.GCM = { data: { message, title, payload } };
    } else if (platform === 'ios') {
      const apnsEnv = process.env.NODE_ENV === 'production' ? 'APNS' : 'APNS_SANDBOX';
      pushMessage[apnsEnv] = { aps: { alert: message, payload } };
    }

    // have to stringify the inner objects and then entire payload
    _.forIn(pushMessage, (value, key) => {
      pushMessage[key] = JSON.stringify(pushMessage[key]);
    });
    return JSON.stringify(pushMessage);
  };

  const getPlatformApplicationArn = (platform) => {
    return platform === 'android' ? gsmAppArn : apnsAppArn;
  };

  return { getPushMessage, getPlatformApplicationArn };
};
