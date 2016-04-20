const recipientProvider = require('./model');
const nestedService = require('../../hooks/nested-service');
const pushRegister = require('./routes/push-register');

module.exports = function () {
  const app = this;

  app.service('/recipients/:recipientId/providers/:providerType', recipientProvider)
    .before({
      all: [
        nestedService({ fk: 'recipientId' }),
        nestedService({ fk: 'providerType' })
      ]
    });

  app.service('/recipients/:recipientId/providers/push/register', { create: pushRegister(app) })
    .before({
      all: nestedService({ fk: 'recipientId' })
    });

};
