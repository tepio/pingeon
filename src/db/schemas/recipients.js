const { Schema } = require('mongoose');

module.exports = new Schema({
  firstName: String,
  lastName: String,
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  lastActivity: Date,
  appId: Schema.Types.ObjectId
}, { versionKey: false });
