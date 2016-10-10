const defaultConfig = require('../../config/default.json');
const productionConfig = require('../../config/production.json');
const config = require('node-helpers').config(defaultConfig, productionConfig);

module.exports = config;
