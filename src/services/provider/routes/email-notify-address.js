module.exports = (app) => async({ address, template, vars }) => {
  const emailHelper = require('../../../helpers/email-send')(app);

  return await emailHelper.send(address, { template, vars });
};
