import feathersMongoose from 'feathers-mongoose';

const recipientProvider = require('./model');
const nestedService = require('../../hooks/nested-service');
const pushRegister = require('./routes/push-register');

module.exports = function () {
  const app = this;

  app.service('/recipients/:recipientId/providers/:providerType', feathersMongoose({ Model: recipientProvider }))
    .before({
      all: [
        nestedService({ fk: 'recipientId' }),
        nestedService({ fk: 'providerType' })
      ]
    });

  app.service('/recipients/:recipientId/providers/push/register', { create: pushRegister })
    .before({
      all: nestedService({ fk: 'recipientId' })
    });

};
