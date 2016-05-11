const _ = require('lodash');

function normalize(doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
}

module.exports = function (schema) {
  _.set(schema, 'options.toObject.transform', normalize);
  _.set(schema, 'options.toJSON.transform', normalize);
};
