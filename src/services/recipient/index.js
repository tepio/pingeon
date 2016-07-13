const Service = require('../base-service');
const recipient = require('./model');

module.exports = function () {
  const app = this;

  app.service('/recipients', new Service({ Model: recipient }));

};
