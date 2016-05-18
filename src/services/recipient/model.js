import renameId from 'mongoose-rename-id';
import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  firstName: String,
  lastName: String,
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  lastActivity: Date,
  appId: Schema.Types.ObjectId
});
schema.plugin(renameId({ newIdName: 'id', mongoose }));

module.exports = mongoose.model('recipient', schema);
