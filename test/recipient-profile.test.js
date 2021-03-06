require('./test-env');

const locationGroup = 'location1';

describe('Recipient', () => {

  before(() => ctx = {});

  describe('create', () => {

    before(async() => {
      helpers.setLocationGroup(locationGroup);
      ctx.recipient = await helpers.createRandomRecipient();
    });

    it('creates recipient provider', () => {
      return request.post(`/recipients/${ctx.recipient.id}/profiles/push`)
        .send({
          deviceId: 'deviceId',
          address: 'deviceToken',
          platform: 'android'
        })
        .set('x-location-group', locationGroup)
        .expect(201)
        .expect(({ body }) => {
          assert.equal(body.recipientId, ctx.recipient.id);
          assert.equal(body.providerType, 'push');
          ctx.recipientProvider = body;
        });
    });

    it('get one recipient provider', () => {
      return request
        .get(`/recipients/${ctx.recipient.id}/profiles/push/${ctx.recipientProvider.id}`)
        .set('x-location-group', locationGroup)
        .expect(200)
        .expect(({ body }) => {
          assert.equal(body.recipientId, ctx.recipient.id);
        });
    });

    it('get all recipient profiles', () => {
      return request.get(`/recipients/${ctx.recipient.id}/profiles/push`)
        .set('x-location-group', locationGroup)
        .expect(200)
        .expect(({ body }) => {
          assert.equal(body[0].recipientId, ctx.recipient.id);
        });
    });

    it('update recipient provider', () => {
      return request.put(`/recipients/${ctx.recipient.id}/profiles/push/${ctx.recipientProvider.id}`)
        .set('x-location-group', locationGroup)
        .send(Object.assign({}, ctx.recipientProvider, { address: 'new' }))
        .expect(200)
        .expect(({ body }) => {
          assert.equal(body.recipientId, ctx.recipient.id);
          assert.equal(body.address, 'new');
        });
    });

    it('patch recipient provider', () => {
      return request.patch(`/recipients/${ctx.recipient.id}/profiles/push/${ctx.recipientProvider.id}`)
        .set('x-location-group', locationGroup)
        .send({ address: 'new' })
        .expect(200)
        .expect(({ body }) => {
          assert.equal(body.recipientId, ctx.recipient.id);
          assert.equal(body.address, 'new');
        });
    });

    describe('remove recipient provider', () => {

      it('should response with removed', () => {
        return request.delete(`/recipients/${ctx.recipient.id}/profiles/push`)
          .set('x-location-group', locationGroup)
          .expect(200)
          .expect(({ body }) => {
            assert.equal(body[0].recipientId, ctx.recipient.id);
          });
      });

      it('should give nothing', () => {
        return request.get(`/recipients/${ctx.recipient.id}/profiles/push`)
          .set('x-location-group', locationGroup)
          .expect(200)
          .expect(({ body }) => {
            assert.equal(body.length, 0);
          });
      });

    });

  });

});
