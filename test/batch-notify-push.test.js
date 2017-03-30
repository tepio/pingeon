require('./test-env');

const { toObject } = require('node-helpers');
const Notification = require('mongoose-multi-connect').getModel('notifications');

const platform = 'android';
const app = { name: 'android' };
const token = String(new Date());

describe('Push send', () => {

  describe('success', () => {
    let recipientId;
    const message = String(new Date());

    before(async() => {
      const recipient = await helpers.createRandomRecipient();
      recipientId = String(recipient.id);
      ctx.recipientProfile = await helpers.createRecipientProfile({
        recipientId, providerType: 'push', platform, app, token
      });
    });

    it('should be sent', async() => {
      await request
        .post('/notification/batch')
        .set('x-location-group', 'location1')
        .send({
          recipients: [recipientId],
          providers: { push: { message } }
        });

      await helpers.timeout(1000);
      const notification = toObject(await Notification.findOne({ message }));

      assert.equal(notification.token, token);
      assert.equal(notification.platform, platform);
      assert.equal(notification.app.name, app.name);
      assert.equal(notification.message, message);
      assert(notification.sendDate);
    });
  });

  describe('default app', () => {

    let recipientWithoutApp;
    const message = String(new Date() + 'no app');

    before(async() => {
      const recipient = await helpers.createRandomRecipient();
      recipientWithoutApp = String(recipient.id);
      ctx.recipientProfile = await helpers.createRecipientProfile({
        recipientId: recipientWithoutApp, providerType: 'push', platform, token
      });
    });

    it('should use default app', async() => {
      await request
        .post('/notification/batch')
        .set('x-location-group', 'location1')
        .send({
          recipients: [recipientWithoutApp],
          providers: { push: { message } }
        });

      await helpers.timeout(1000);
      const notification = toObject(await Notification.findOne({ message }));

      assert.equal(notification.token, token);
      assert.equal(notification.platform, platform);
      assert.equal(notification.message, message);
      assert(notification.sendDate);
      assert(!notification.error);
    });
  });

});
