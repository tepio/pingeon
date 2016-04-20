require('./test-env');

const _ = require('lodash');

const PLATFORM_IOS = 'ios';
const PLATFORM_ANDROID = 'android';

// Devices that one person can have
const iPadDeviceId = 'iPad';
const iPhoneDeviceId = 'iPhone';
const coincidedIPhoneDeviceId = 'iPhone';

const androidDeviceId = 'android';

function getDeviceToken() {
  return (+new Date()).toString();
}

describe('Device token registration', () => {

  describe('Add test data', () => {

    before(async() => {
      ctx.bigBrother = await helpers.createRandomRecipient();
      ctx.youngBrother = await helpers.createRandomRecipient();
      ctx.firstPerson = await helpers.createRandomRecipient();
      ctx.secondPerson = await helpers.createRandomRecipient();
      ctx.personWithTwoDevices = await helpers.createRandomRecipient();
    });

    it('should have ids', () => {
      assert.ok(ctx.bigBrother._id);
      assert.ok(ctx.youngBrother._id);
      assert.ok(ctx.firstPerson._id);
      assert.ok(ctx.secondPerson._id);
      assert.ok(ctx.personWithTwoDevices._id);
    });
  });

  describe('Register recipient provider', () => {

    it('should be registered', () => {
      return request.post(`/recipients/${ctx.personWithTwoDevices._id}/providers/push/register`)
        .send({
          platform: PLATFORM_IOS,
          deviceId: iPhoneDeviceId,
          address: getDeviceToken()
        })
        .expect(({ body }) => {
          assert.equal(body.recipientId, ctx.personWithTwoDevices._id);
          assert.equal(body.providerType, 'push');
        })
        .expect(201);
    });

  });


  describe('Register device token after app update', () => {

    it('should be registered at first time', () => {
      ctx.firstDeviceToken = getDeviceToken();

      return request.post(`/recipients/${ctx.personWithTwoDevices._id}/providers/push/register`)
        .send({
          platform: PLATFORM_IOS,
          deviceId: iPhoneDeviceId,
          address: ctx.firstDeviceToken
        })
        .expect(({ body }) => {
          ctx.firstRegisterRecipientProviderId = body._id;
        })
        .expect(201);
    });

    // Kinda app was update so we login and register it again without unregister after logout

    it('should be registered at second time for same recipient', () => {
      ctx.secondDeviceToken = getDeviceToken();

      return request.post(`/recipients/${ctx.personWithTwoDevices._id}/providers/push/register`)
        .send({
          platform: PLATFORM_IOS,
          deviceId: iPhoneDeviceId,
          address: ctx.secondDeviceToken
        })
        .expect(({ body }) => {
          assert.equal(body.address, ctx.secondDeviceToken, 'changed token');
          assert.equal(body._id, ctx.firstRegisterRecipientProviderId, 'same recipient');
        })
        .expect(201);
    });

    it('should not be old address', () => {
      return request.get(`/recipients/${ctx.personWithTwoDevices._id}` +
          `/providers/push?address=${ctx.firstDeviceToken}`)
        .expect(({ body }) => {
          assert(_.isEmpty(body));
        })
        .expect(200);
    });

  });

  describe('Register PNs on 2 devices', () => {

    before(() => {
      return request.post(`/recipients/${ctx.personWithTwoDevices._id}/providers/push/register`)
        .send({
          platform: PLATFORM_IOS,
          deviceId: iPhoneDeviceId,
          address: getDeviceToken()
        })
        .expect(({ body }) => {
          ctx.iPhoneRegister = body;
        });
    });

    before(() => {
      return request.post(`/recipients/${ctx.personWithTwoDevices._id}/providers/push/register`)
        .send({
          platform: PLATFORM_IOS,
          deviceId: iPadDeviceId,
          address: getDeviceToken()
        })
        .expect(({ body }) => {
          ctx.iPadRegister = body;
        });
    });

    before(() => {
      return request.get(`/recipients/${ctx.personWithTwoDevices._id}/providers/push`)
        .expect(({ body }) => {
          ctx.deviceTokens = body;
        });
    });

    it('should be have proper device tokens', () => {
      assert.equal(ctx.iPhoneRegister.deviceId, iPhoneDeviceId);
      assert.equal(ctx.iPadRegister.deviceId, iPadDeviceId);
    });

    it('should be for one person', () => {
      assert.equal(ctx.iPhoneRegister.recipientId, ctx.personWithTwoDevices._id);
      assert.equal(ctx.iPadRegister.recipientId, ctx.personWithTwoDevices._id);
    });

    it('should be 2 device tokens', () => {
      assert.equal(ctx.deviceTokens.length, 2);
    });

  });

  describe('Register PNs for one user and then for second', () => {

    const tokenForOneInstall = getDeviceToken();

    before(() => {
      return request.post(`/recipients/${ctx.bigBrother._id}/providers/push/register`)
        .send({
          platform: PLATFORM_ANDROID,
          deviceId: androidDeviceId,
          address: tokenForOneInstall
        });
    });

    before(() => {
      return request.post(`/recipients/${ctx.youngBrother._id}/providers/push/register`)
        .send({
          platform: PLATFORM_ANDROID,
          deviceId: androidDeviceId,
          address: tokenForOneInstall
        });
    });

    before(() => {
      return request.get(`/recipients/${ctx.youngBrother._id}/providers/push` +
          `?deviceId=${androidDeviceId}`)
        .expect(({ body }) => {
          ctx.deviceTokensForAndroid = body;
        });
    });

    before(() => {
      return request.get(`/recipients/${ctx.bigBrother._id}/providers/push`)
        .expect(({ body }) => {
          ctx.deviceTokensForBigBrother = body;
        });
    });

    it('should be 1 device token for android', () => {
      assert.equal(ctx.deviceTokensForAndroid.length, 1);
    });

    it('should be android device token for young brother', () => {
      assert.equal(ctx.deviceTokensForAndroid[0].deviceId, androidDeviceId);
      assert.equal(ctx.deviceTokensForAndroid[0].recipientId, ctx.youngBrother._id);
    });

    it('should be 0 device tokens for big brother', () => {
      assert.equal(ctx.deviceTokensForBigBrother.length, 0);
    });

  });

  describe('Register users with coincided device id', () => {

    before(() => {
      return request.post(`/recipients/${ctx.firstPerson._id}/providers/push/register`)
        .send({
          platform: PLATFORM_IOS,
          deviceId: coincidedIPhoneDeviceId,
          address: getDeviceToken()
        });
    });

    before(() => {
      return request.post(`/recipients/${ctx.secondPerson._id}/providers/push/register`)
        .send({
          platform: PLATFORM_IOS,
          deviceId: coincidedIPhoneDeviceId,
          address: getDeviceToken()
        });
    });

    before(() => {
      return request.get(`/recipients/${ctx.firstPerson._id}/providers/push` +
          `?deviceId=${coincidedIPhoneDeviceId}`)
        .expect(({ body }) => {
          ctx.resultForFirstPerson = body;
        });
    });

    before(() => {
      return request.get(`/recipients/${ctx.secondPerson._id}/providers/push` +
          `?deviceId=${coincidedIPhoneDeviceId}`)
        .expect(({ body }) => {
          ctx.resultForSecondPerson = body;
        });
    });

    it('should be one result for both persons', () => {
      assert.equal(ctx.resultForFirstPerson.length, 1);
      assert.equal(ctx.resultForSecondPerson.length, 1);
    });

    it('should be different documents', () => {
      assert.notEqual(ctx.resultForFirstPerson[0]._id, ctx.resultForSecondPerson[0]._id);
      assert.notEqual(ctx.resultForFirstPerson[0].address, ctx.resultForSecondPerson[0].address);
      assert.notEqual(ctx.resultForFirstPerson[0].recipientId, ctx.resultForSecondPerson[0].recipientId);
    });

  });

  describe('Unregister users with coincided device id', () => {

    before(() => {
      return request.delete(`/recipients/${ctx.firstPerson._id}/providers/push`)
        .send({ deviceId: coincidedIPhoneDeviceId });
    });

    before(() => {
      return request.get(`/recipients/${ctx.firstPerson._id}/providers/push` +
          `?deviceId=${coincidedIPhoneDeviceId}`)
        .expect(({ body }) => {
          ctx.resultForFirstPerson = body;
        });
    });

    before(() => {
      return request.get(`/recipients/${ctx.secondPerson._id}/providers/push` +
          `?deviceId=${coincidedIPhoneDeviceId}`)
        .expect(({ body }) => {
          ctx.resultForSecondPerson = body;
        });
    });

    it('should be unregistered first person', () => {
      assert.equal(ctx.resultForFirstPerson.length, 0);
    });

    it('should be still registered second person', () => {
      assert.equal(ctx.resultForSecondPerson.length, 1);
    });

  });

});
