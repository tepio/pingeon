const emailHelper = require('../../../helpers/email');

module.exports = async (emailConfig) => {
  return await emailHelper.send(Object.assign({}, emailConfig, { email: emailConfig.address }));
};
