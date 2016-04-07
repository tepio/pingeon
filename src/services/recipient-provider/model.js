import mongoose, { Schema } from 'mongoose';

const recipientProviderSchema = new Schema({
  channel: String,
  key: String,
  recipientId: Schema.Types.ObjectId
});

module.exports = mongoose.model('recipientProviders', recipientProviderSchema);
