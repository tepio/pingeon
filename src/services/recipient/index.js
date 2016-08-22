const Service = require('../base-service');
const Recipient = require('./model');
const upsert = require('./routes/upsert');

module.exports = function () {
  const app = this;

  app.service('/recipients', new Service({ Model: Recipient })
    .extend({ create: upsert })
  );

};
