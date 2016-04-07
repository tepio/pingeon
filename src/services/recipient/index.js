const mongoose = require('feathers-mongoose');
const recipient = require('./model');

module.exports = function () {
  const app = this;

  app.service('/recipients', mongoose({ Model: recipient }))
    .before({
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    })
    .after({
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    });

};
