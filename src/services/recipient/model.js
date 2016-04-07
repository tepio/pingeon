import mongoose, { Schema } from 'mongoose';

const recipientSchema = new Schema({
  firstName: String,
  lastName: String,
  lastActivity: Date,
  appId: Schema.Types.ObjectId
});

module.exports = mongoose.model('recipient', recipientSchema);
