const { before } = require('hooks');
const helpers = require('../../helpers');

before('Send a pub/sub message to a recipient > /provider/pubsub/recipient', async(transaction, done) => {
  const { recipientId } = await helpers.createRecipientProfile({ providerType: 'pubsub' });
  const requestBody = JSON.parse(transaction.request.body);

  requestBody.recipientId = recipientId;

  transaction.request.body = JSON.stringify(requestBody);
  done();
});
