const emailHelper = require('../../../helpers/email');

module.exports = async({ address, template, vars }) => {
  return await emailHelper.send({ email: address, template, vars });
};
