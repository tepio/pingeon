const debug = require('debug')('app:error-handler');

module.exports = () => (err, req, res, next) => {
  if (!err) return next();
  if (!err.code || err.code >= 500) debug(err);

  return res
    .status(err.code || 500)
    .send(err.message);
};
