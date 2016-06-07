require('../global-mocks');

const app = require('../../src/app');
const config = require('../../src/helpers/config');
const port = config.get('port');
const server = app.listen(port);
const debug = require('debug')('app');

server.on('listening', () =>
  debug(`Mocked server started on ${config.get('host')}:${port}`)
);
