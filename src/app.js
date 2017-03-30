const db = require('./db');
const compress = require('compression');
const cors = require('cors');
const feathers = require('feathers');
const { locationGroupHeader } = require('feathers-lg-multi-service-mongoose');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const middleware = require('./middleware');
const services = require('./services');
const sentry = require('./helpers/sentry');

const app = feathers();
app.use(compress())
  .options('*', cors())
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(sentry.requestHandler)
  .configure(db)
  .configure(hooks())
  .configure(rest())
  .use(locationGroupHeader(
    { defaultLocationGroup: '' }
  ))
  .configure(services)
  .configure(middleware)
  .use(sentry.errorHandler);

module.exports = app;
