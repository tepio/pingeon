const { before } = require('hooks');
const helpers = require('../../helpers');

before('Send a message to an email address > /provider/email/recipient', async(transaction, done) => {
  const { recipientId } = await helpers.createRecipientProfile({ providerType: 'email' });
  const requestBody = JSON.parse(transaction.request.body);

  requestBody.recipientId = recipientId;

  transaction.request.body = JSON.stringify(requestBody);
  done();
});
