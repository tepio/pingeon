const mongoose = require('feathers-mongoose');
const recipient = require('./model');

module.exports = function () {
  const app = this;

  app.service('/recipients', mongoose({ Model: recipient }));

};
