require('./test-env');

const RecipientProvider = require('../src/services/recipient-provider/model');

const message = 'hello';
const payload = { some: 'lol' };
const address = 'some';
const deviceId = 'some';

describe('Push provider', () => {

  before(async() => {
    ctx.recipient = await helpers.createRandomRecipient();
    ctx.recipientProvider = await RecipientProvider.create({
      recipientId: ctx.recipient.id,
      address, deviceId, providerType: 'push'
    });
  });

  const assertNotificaionFields = (notification) => {
    assert.equal(notification.message, message);
    assert.equal(notification.address, address);
    assert.equal(notification.deviceId, deviceId);
    assert.equal(notification.recipientId, ctx.recipient.id);
    assert.deepEqual(notification.payload, payload);
    assert.ok(notification.id);
  };

  it('should be notified', () => {
    return request.post(`/provider/push/recipient/${ctx.recipient.id}`)
      .send({ message, payload })
      .end().get('body')
      .each(notification => assertNotificaionFields(notification));
  });

});
