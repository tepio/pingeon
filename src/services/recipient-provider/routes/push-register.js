const RecipientProvider = require('../model');
const _ = require('lodash');

module.exports = () => async(data) => {
  const { platform, deviceId, address, recipientId } = data;

  const newRecipientProvider = {
    recipientId, deviceId, address, platform,
    providerType: 'push', registeredDate: new Date()
  };

  const recipientProviderWithSameToken = _.first(await RecipientProvider.find({ query: { address } }));

  if (recipientProviderWithSameToken && recipientProviderWithSameToken.recipientId !== recipientId) {
    return RecipientProvider.patch(recipientProviderWithSameToken._id, newRecipientProvider, {});
  }

  const oldRecipientProvider = _.first(await RecipientProvider.find({ query: { deviceId, recipientId } }));

  // update device token
  if (oldRecipientProvider) {
    return RecipientProvider.patch(oldRecipientProvider._id, newRecipientProvider, {});
  }

  return RecipientProvider.create(newRecipientProvider);
};
