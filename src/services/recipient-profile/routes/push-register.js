const RecipientProvider = require('../model');

module.exports = async(data) => {
  const { platform, deviceId, address, recipientId } = data;

  const newRecipientProvider = {
    recipientId, deviceId, address, platform,
    providerType: 'push', registeredDate: new Date()
  };

  const recipientProviderWithSameToken = await RecipientProvider.findOne({ address });

  if (recipientProviderWithSameToken && recipientProviderWithSameToken.recipientId !== recipientId) {
    return RecipientProvider.update({ _id: recipientProviderWithSameToken._id }, newRecipientProvider);
  }

  return await RecipientProvider.findOneAndUpdate(
    { deviceId, recipientId }, newRecipientProvider, { new: true, upsert: true }
  );
};
