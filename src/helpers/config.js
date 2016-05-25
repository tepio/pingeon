const _ = require('lodash');

const iterator = require('object-recursive-iterator');
const defaultConfig = require('../../config/default.json');
const productionConfig = require('../../config/production.json');

iterator.forAll(productionConfig, (path, key, obj) => {
  obj[key] = process.env[obj[key]];
});

function get(name) {
  const defaultConfigNode = _.get(defaultConfig, name);
  const prodConfigNode = _.get(productionConfig, name);

  if (process.env.NODE_ENV === 'production') return prodConfigNode || defaultConfigNode;
  return defaultConfigNode;
}

module.exports = { get };
