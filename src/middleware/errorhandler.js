module.exports = () => (err, req, res, next) => {
  if (!err) next();
  if (!err.toJSON) next(err);

  const error = err.toJSON();
  return res.status(error.code).send({ error });
};
