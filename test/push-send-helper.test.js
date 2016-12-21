require('./test-env');

const { createEndpointStub, publishStub } = mocks.awsStub.getStubs();

const pushProvider = require('../src/helpers/push-send');
const pushRegister = require('../src/services/recipient-profile/routes/push-register');
const Notification = require('../src/services/notification/model');
const RecipientProfile = require('../src/services/recipient-profile/model');

const platform = 'android';
const app = { name: 'android' };
const token = String(new Date());
const message = String(new Date());
const error = { message: String(new Date()) };
const payload = { badge: 5 };
const EndpointArn = '1';

describe('Push', () => {

  before(() => ctx.pushSendSpy = sinon.spy(pushProvider, 'send'));
  after(() => ctx.pushSendSpy.restore());

  describe('send', () => {

    describe('success', () => {

      before(() => {
        createEndpointStub.returns({ EndpointArn: '1' });
        publishStub.returns({ MessageId: '2' });
      });

      it('should be sent', () => {
        return pushProvider
          .send({ platform, token, message, payload, app })
          .then(async res => {
            assert.equal(res.platform, platform);
            assert.equal(res.app, app);
            assert.equal(res.message, message);
            assert.equal(res.token, token);
            assert.deepEqual(res.payload, payload);
            assert.ok(res.platformApplicationArn);
            assert.ok(res.providerMessageId);
            assert.ok(res.sendDate);
            assert.ok(ctx.pushSendSpy.called);

            assert.ok(await Notification.findOne({ providerMessageId: res.providerMessageId }));
          });
      });

    });

    describe('fail', () => {

      before(() => {
        createEndpointStub.returns({ EndpointArn });
        publishStub.throws(error);
      });

      before(() => {
        pushProvider.send({ platform, token, message, payload, app });
      });

      it('should be fail', async() => {
        assert.ok(await Notification.findOne({ error }));
      });

    });

  });

  describe('old token', () => {

    const oldTokenError = { message: 'Invalid parameter: This endpoint is already registered with a different token.' };
    const oldToken = String(new Date());

    before(async() => {
      await pushRegister({ token: oldToken, deviceId: 'some', recipientId: 'some', app });
    });

    before(async() => {
      const res = await RecipientProfile.findOne({ token: oldToken });
      assert.ok(res);
    });

    before(() => {
      createEndpointStub.returns({ EndpointArn });
      publishStub.throws(oldTokenError);
    });

    before(() => {
      pushProvider.send({ platform, token: oldToken, message, payload, app });
    });

    it('should be no old device token', async() => {
      const res = await RecipientProfile.findOne({ token: oldToken });
      assert.ok(!res);
    });

  });

});
