import feathersMongoose from 'feathers-mongoose';

const recipientProfile = require('./model');
const nestedService = require('../../hooks/nested-service');
const pushRegister = require('./routes/push-register');

module.exports = function () {
  const app = this;

  app.service('/recipients/:recipientId/profiles/:providerType', feathersMongoose({ Model: recipientProfile }))
    .before({
      all: [
        nestedService({ fk: 'recipientId' }),
        nestedService({ fk: 'providerType' })
      ]
    });

  app.service('/recipients/:recipientId/profiles/push/register', { create: pushRegister })
    .before({
      all: nestedService({ fk: 'recipientId' })
    });

};
