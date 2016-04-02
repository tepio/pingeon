const app = require('./app');
const debug = require('debug')('app');
const port = process.env.PORT || app.get('port');
const server = app.listen(port);

server.on('listening', () =>
  debug(`Feathers application started on ${app.get('host')}:${port}`)
);
