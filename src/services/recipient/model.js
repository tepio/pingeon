import normalizeToObject from '../../helpers/mongoose-pluging/normalize-to-object';
import mongoose, { Schema } from 'mongoose';

const recipientSchema = new Schema({
  firstName: String,
  lastName: String,
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  lastActivity: Date,
  appId: Schema.Types.ObjectId
});
recipientSchema.plugin(normalizeToObject);

module.exports = mongoose.model('recipient', recipientSchema);
