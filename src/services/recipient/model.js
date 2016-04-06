const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipientSchema = new Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const recipientModel = mongoose.model('recipient', recipientSchema);

module.exports = recipientModel;
