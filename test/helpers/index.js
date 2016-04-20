function createRandomRecipient(recipient) {
  return app.service('recipients').create(Object.assign({ firstName: 'John', lastName: 'Testerson' }, recipient));
}

module.exports = { createRandomRecipient };
