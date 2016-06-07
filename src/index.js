const app = require('./app');
const debug = require('debug')('app');
const config = require('./helpers/config');
const port = config.get('port');
const server = app.listen(port);

server.on('listening', () =>
  debug(`Feathers application started on ${config.get('host')}:${port}`)
);
