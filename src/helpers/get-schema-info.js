const { db: { url } } = require('smart-config');
const _ = require('lodash');

module.exports = function (schemaPath) {
  const schema = require(schemaPath);
  const collectionName = _.last(schemaPath.split('/'));
  return { schema, collectionName, dbUrl: url };
};
