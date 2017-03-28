const { service } = require('feathers-lg-multi-service-mongoose');
const getSchemaInfo = require('../../helpers/get-schema-info');
const schemaInfo = getSchemaInfo(__dirname + '/../../db/schemas/recipients');
const upsert = require('./middleware/upsert');

module.exports = function () {
  const app = this;

  app.use('/recipients', upsert);
  app.service('/recipients', service({ app, ...schemaInfo }));

};
