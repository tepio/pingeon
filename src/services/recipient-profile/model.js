import renameId from 'mongoose-rename-id';
import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  recipientId: {
    type: String,
    required: true
  },
  providerType: {
    type: String,
    required: true,
    enum: ['push', 'pubsub', 'email']
  },
  address: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    enum: ['android', 'ios']
  },
  registeredDate: {
    type: Date,
    default: Date.now
  },
  deviceId: String
});
schema.plugin(renameId({ newIdName: 'id', mongoose }));

module.exports = mongoose.model('recipientProfile', schema);
