const { get } = require('lodash');
const multiDB = require('mongoose-multi-connect');

module.exports = async(req, res, next) => {
  if (req.method !== 'POST' || req.originalUrl !== '/recipients') return next();
  if (!get(req, 'body.id')) return next();

  const locationGroup = get(req, 'headers[x-location-group]');
  const Recipient = multiDB.getModel('recipients', locationGroup);

  const recipient = await Recipient.findOneAndUpdate(
    { _id: req.body.id }, req.body, { new: true, upsert: true }
  );

  return res.status(201).send(recipient);
};
