const Service = require('../base-service');
const recipientProfile = require('./model');
const nestedService = require('../../hooks/nested-service');
const pushRegister = require('./routes/push-register');
const pushUnregister = require('./routes/push-unregister');
const recipientAutoCreate = require('../recipient/hooks/recipient-auto-create');

module.exports = function () {
  const app = this;

  app.service('/recipients/:recipientId/profiles/:providerType', new Service({ Model: recipientProfile }))
    .before({
      all: [
        nestedService({ fk: 'recipientId' }),
        nestedService({ fk: 'providerType' })
      ],
      create: recipientAutoCreate()
    });

  app.service('/recipients/:recipientId/profiles/push/register', { create: pushRegister })
    .before({
      all: nestedService({ fk: 'recipientId' }),
      create: recipientAutoCreate()
    });

  app
    .service('/recipients/:recipientId/profiles/push/unregister', {
      create: (data) => {
        const { recipientId, deviceId } = data;
        return pushUnregister({ recipientId, deviceId });
      }
    })
    .before({
      all: nestedService({ fk: 'recipientId' })
    });

};
