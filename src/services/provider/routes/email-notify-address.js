const emailHelper = require('../../../helpers/email-send');

module.exports = async({ address, template, vars }) => {
  return await emailHelper.send(address, { template, vars });
};
