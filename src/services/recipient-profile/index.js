const { service } = require('feathers-lg-multi-service-mongoose');
const getSchemaInfo = require('../../helpers/get-schema-info');
const schemaInfo = getSchemaInfo(__dirname + '/../../db/schemas/recipientprofiles');

const nestedService = require('../../hooks/nested-service');
const pushRegister = require('./routes/push-register');
const pushUnregister = require('./routes/push-unregister');
const recipientAutoCreate = require('../recipient/hooks/recipient-auto-create');

module.exports = function () {
  const app = this;

  app.service('/recipients/:recipientId/profiles/:providerType',
    service(Object.assign({ app }, schemaInfo)))
    .before({
      all: [
        nestedService({ fk: 'recipientId' }),
        nestedService({ fk: 'providerType' })
      ],
      create: recipientAutoCreate()
    });

  app.service('/recipients/:recipientId/profiles/push/register', { create: pushRegister })
    .before({
      all: [nestedService({ fk: 'recipientId' })],
      create: recipientAutoCreate()
    });

  app
    .service('/recipients/:recipientId/profiles/push/unregister', { create: pushUnregister })
    .before({
      all: [nestedService({ fk: 'recipientId' })]
    });

};
