module.exports = () => (err, req, res, next) => {
  if (!err) return next();

  const { status, message } = err;
  return res.status(status).send({
    error: { status, message }
  });
};
