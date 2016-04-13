const _ = require('lodash');

module.exports = (vars) => {
  const result = [];
  _.mapKeys(vars, (val, key) => {
    result.push({ name: key, content: val });
  });
  return result;
};
