const Recipient = require('../model');

module.exports = async(data) => {
  if (data.id) {
    return await Recipient.findOneAndUpdate(
      { _id: data.id }, data, { new: true, upsert: true }
    );
  }

  return await Recipient.create(data);
};
