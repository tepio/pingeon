const before = require('hooks').before;
const helpers = require('../helpers');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/notificationMicroservice');

before('Send a message to an email address > /provider/email/recipient', async(transaction, done) => {
  const { recipientId } = await helpers.createRecipientProfile({ providerType: 'email' });

  console.log('send to recipient', recipientId);
  const requestBody = JSON.parse(transaction.request.body);

  requestBody.recipientId = recipientId;

  transaction.request.body = JSON.stringify(requestBody);
  done();
});
