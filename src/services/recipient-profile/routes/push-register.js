const RecipientProvider = require('../model');

module.exports = async(data) => {
  const { platform, deviceId, token, recipientId } = data;

  const newRecipientProvider = {
    recipientId, deviceId, token, platform,
    providerType: 'push', registeredDate: new Date()
  };

  const recipientProviderWithSameToken = await RecipientProvider.findOne({ token });

  if (recipientProviderWithSameToken && recipientProviderWithSameToken.recipientId !== recipientId) {
    return RecipientProvider.update({ _id: recipientProviderWithSameToken._id }, newRecipientProvider);
  }

  return await RecipientProvider.findOneAndUpdate(
    { deviceId, recipientId }, newRecipientProvider, { new: true, upsert: true }
  );
};
