const multiDB = require('mongoose-multi-connect');

module.exports = async function ({ platform, deviceId, token, recipientId, app }, params) {
  const RecipientProvider = multiDB.getModel('recipientprofiles', params, 'locationGroup');
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
