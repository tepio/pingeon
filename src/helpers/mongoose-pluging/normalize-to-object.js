const _ = require('lodash');

module.exports = function simpleId(schema) {
  _.set(schema, 'options.toObject.transform', (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  });
};
