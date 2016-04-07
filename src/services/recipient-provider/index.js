const mongoose = require('feathers-mongoose');
const recipientProvider = require('./model');
const nestedServiceHook = require('../../hooks/nested-service');

module.exports = function () {
  const app = this;

  app.service('/recipients/:recipientId/providers', mongoose({ Model: recipientProvider }))
    .before({
      all: nestedServiceHook({ fk: 'recipientId' })
    });

};
