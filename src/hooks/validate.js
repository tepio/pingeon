const statusError = require('http-errors');

module.exports = ({ validation }) => (hook) => {

  const { isValid, errorMessage } = validation({ data: hook.data });
  if (!isValid) throw statusError(400, errorMessage);

  return hook;
};
