const _ = require('lodash');
const multiDB = require('mongoose-multi-connect');

module.exports = () => function (hook) {
  const locationGroup = _.get(hook, 'params.locationGroup');
  this.getModel = multiDB.getByPostfix(locationGroup);

  return hook;
};
