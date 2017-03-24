const RecipientProvider = require('../../src/services/recipient-profile/model');
const Recipient = require('../../src/services/recipient/model');
const db = require('./db');
const { ObjectId } = require('mongoose').mongo;
const requireSubvert = require('require-subvert')(__dirname);

function requireStub(path) {
  return (value) => {
    requireSubvert.subvert(path, value);
  };
}


function randomId() {
  return new ObjectId();
}

function createRandomRecipient(recipient) {
  return Recipient.create(Object.assign({
    firstName: 'John',
    lastName: 'Testerson'
  }, recipient));
}

function timeout(ms) {
  return new Promise(res => {
    setTimeout(res, ms);
  });
}

async function createRecipientProfile({ recipientId, address = 'some', ...other }) {
  recipientId = recipientId || (await createRandomRecipient({ id: recipientId })).id;

  return await RecipientProvider.create({ recipientId, address, ...other });
}

module.exports = {
  createRandomRecipient,
  createRecipientProfile,
  db,
  timeout,
  randomId,
  requireStub
};
