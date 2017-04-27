require('./test-env');
const providerType = 'push';

describe('Test helpers', () => {

  before(() => helpers.setLocationGroup('location1'));

  describe('create recipient than profile', () => {
    before(async() => {
      ctx.recipient = await helpers.createRandomRecipient();
      ctx.recipientProfile = await helpers.createRecipientProfile({ recipientId: ctx.recipient.id, providerType });
    });

    it('should have right fields', async() => {
      assert.equal(ctx.recipient.id, ctx.recipientProfile.recipientId);
      assert.equal(ctx.recipientProfile.providerType, providerType);
      assert.ok(ctx.recipientProfile.address);
    });
  });

  describe('create profile with recipient', () => {
    before(async() => {
      ctx.recipientProfile = await helpers.createRecipientProfile({ providerType });
    });

    it('should have right fields', async() => {
      assert.ok(ctx.recipient.id);
      assert.ok(ctx.recipientProfile.address);
      assert.equal(ctx.recipientProfile.providerType, providerType);
    });
  });

});
