const emailHelper = require('../../../helpers/email');

module.exports = async({ address, ...otherConfig }) => {
  return await emailHelper.send({ email: address, ...otherConfig });
};
