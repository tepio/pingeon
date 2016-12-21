const RecipientProvider = require('../model');

module.exports = async({ platform, deviceId, token, recipientId, app }) => {
  const newRecipientProvider = {
    recipientId, deviceId, token, platform, app,
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
