const mongoose = require('feathers-mongoose');
const updateService = require('./routes/update-service');
const recipient = require('./model');

module.exports = function () {
  const app = this;
  const hooks = {
    before: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    },
    after: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    }
  };

  app.service('/recipients', mongoose({ Model: recipient }))
    .before(hooks.before)
    .after(hooks.after);

  app.service('/recipients/:id/service', { update: updateService(app) });

};
