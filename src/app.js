const path = require('path');
const compress = require('compression');
const cors = require('cors');
const feathers = require('feathers');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const middleware = require('./middleware');
const services = require('./services');

const app = feathers();

app.use(compress())
  .options('*', cors())
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  .configure(services)
  .configure(middleware);

module.exports = app;
