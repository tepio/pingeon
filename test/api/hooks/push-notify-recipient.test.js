const { before } = require('hooks');
const helpers = require('../../helpers');

before('Send a push notification to a recipient > /provider/push/recipient', async(transaction, done) => {
  const { recipientId } = await helpers.createRecipientProfile({ providerType: 'push' });
  const requestBody = JSON.parse(transaction.request.body);

  requestBody.recipientId = recipientId;

  transaction.request.body = JSON.stringify(requestBody);
  done();
});
