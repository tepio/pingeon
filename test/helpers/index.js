const multiConnect = require('mongoose-multi-connect');

const db = require('./db');
const { ObjectId } = require('mongoose').mongo;
const requireSubvert = require('require-subvert')(__dirname);

let locationGroup;
const getRecipientProvider = () => multiConnect.getModel('recipientprofiles', locationGroup);
const getRecipient = () => multiConnect.getModel('recipients', locationGroup);

function requireStub(path) {
  return (value) => {
    requireSubvert.subvert(path, value);
  };
}

function randomId() {
  return new ObjectId();
}

function createRandomRecipient(recipient) {
  return getRecipient().create(Object.assign({
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

  return await getRecipientProvider().create({ recipientId, address, ...other });
}

function setLocationGroup(group) {
  locationGroup = group;
}

module.exports = {
  createRandomRecipient,
  createRecipientProfile,
  db,
  timeout,
  randomId,
  requireStub,
  setLocationGroup
};
