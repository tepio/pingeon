const RecipientProvider = require('../../src/services/recipient-provider/model');
const Recipient = require('../../src/services/recipient/model');

function createRandomRecipient(recipient) {
  return Recipient.create(Object.assign({ firstName: 'John', lastName: 'Testerson' }, recipient));
}

async function createRecipientProfile({ recipientId, address = 'some', ...other }) {
  recipientId = recipientId || (await createRandomRecipient({ id: recipientId })).id;

  return await RecipientProvider.create({ recipientId, address, ...other });
}

module.exports = {
  createRandomRecipient,
  createRecipientProfile
};
