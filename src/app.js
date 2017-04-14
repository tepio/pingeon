const { locationGroupHeader } = require('feathers-lg-multi-service-mongoose');
const beforeRequest = require('./middleware/before-request');
const afterRequest = require('./middleware/after-request');
const db = require('./db');
const feathers = require('feathers');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const services = require('./services');

const app = feathers();

app
  .configure(beforeRequest)
  .configure(hooks())
  .configure(rest())
  .configure(db)
  .use(locationGroupHeader(
    { defaultLocationGroup: '' }
  ))
  .configure(services)
  .configure(afterRequest);

module.exports = app;
