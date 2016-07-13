const errors = require('feathers-errors');

module.exports = ({ validation }) => (hook) => {

  const { isValid, errorMessage } = validation({ data: hook.data });
  if (!isValid) throw new errors.BadRequest(errorMessage);

  return hook;
};
