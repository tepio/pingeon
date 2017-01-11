require('source-map-support').install();

const app = require('./app');
const debug = require('debug')('app');
const config = require('smart-config');
const port = config.get('port');
const server = app.listen(port);

server.on('listening', () =>
  debug(`Pingeon started on ${config.get('host')}:${port}`)
);
