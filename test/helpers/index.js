const RecipientProvider = require('../../src/services/recipient-profile/model');
const Recipient = require('../../src/services/recipient/model');
const db = require('./db');
const { ObjectId } = require('mongoose').mongo;

function randomId() {
  return new ObjectId();
}

function createRandomRecipient(recipient) {
  return Recipient.create(Object.assign({
    firstName: 'John',
    lastName: 'Testerson'
  }, recipient));
}

async function createRecipientProfile({ recipientId, address = 'some', ...other }) {
  recipientId = recipientId || (await createRandomRecipient({ id: recipientId })).id;

  return await RecipientProvider.create({ recipientId, address, ...other });
}

module.exports = {
  createRandomRecipient,
  createRecipientProfile,
  db,
  randomId
};
