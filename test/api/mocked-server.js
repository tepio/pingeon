require('../global-mocks');

const app = require('../../src/app');
const port = app.get('port');
const server = app.listen(port);
const debug = require('debug')('app');

server.on('listening', () =>
  debug(`Mocked server started on ${app.get('host')}:${port}`)
);
