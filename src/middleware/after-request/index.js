const errorhandler = require('./errorhandler');
const notFound = require('./not-found-handler');
const sentry = require('../../helpers/sentry');

module.exports = function () {
  const app = this;

  app.use(notFound());
  app.use(errorhandler());
  app.use(sentry.errorHandler);
};
