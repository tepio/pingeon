const multiConnect = require('mongoose-multi-connect');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const requireDir = require('require-dir');
const renameId = require('mongoose-rename-id');
const { db: { url } } = require('smart-config');
const { mapValues } = require('lodash');

const schemas = mapValues(requireDir('./schemas'), (schema) => {
  schema.plugin(renameId({ mongoose, newIdName: 'id' }));
  return schema;
});

mongoose.Promise = Promise;
multiConnect.init({ mongoose, url, schemas });

module.exports = () => multiConnect;
