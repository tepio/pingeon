require('./test-env');

describe('Recipient', () => {

  before(() => ctx = {});

  describe('create', () => {

    before(async() => {
      ctx.recipient = await helpers.createRandomRecipient();
    });

    it('creates recipient provider', () => {
      return request.post(`/recipients/${ctx.recipient._id}/providers/push`)
        .send({
          deviceId: 'deviceId',
          address: 'deviceToken',
          platform: 'android'
        })
        .expect(201)
        .expect(({ body }) => {
          assert.equal(body.recipientId, ctx.recipient._id);
          assert.equal(body.providerType, 'push');
          ctx.recipientProvider = body;
        });
    });

    it('get one recipient provider', () => {
      return request.get(`/recipients/${ctx.recipient._id}/providers/push/${ctx.recipientProvider._id}`)
        .expect(200)
        .expect(({ body }) => {
          assert.equal(body.recipientId, ctx.recipient._id);
        });
    });

    it('get all recipient providers', () => {
      return request.get(`/recipients/${ctx.recipient._id}/providers/push`)
        .expect(200)
        .expect(({ body }) => {
          assert.equal(body[0].recipientId, ctx.recipient._id);
        });
    });

    it('update recipient provider', () => {
      return request.put(`/recipients/${ctx.recipient._id}/providers/push/${ctx.recipientProvider._id}`)
        .send({ ...ctx.recipientProvider, address: 'new' })
        .expect(200)
        .expect(({ body }) => {
          assert.equal(body.recipientId, ctx.recipient._id);
          assert.equal(body.address, 'new');
        });
    });

    it('patch recipient provider', () => {
      return request.patch(`/recipients/${ctx.recipient._id}/providers/push/${ctx.recipientProvider._id}`)
        .send({ address: 'new' })
        .expect(200)
        .expect(({ body }) => {
          assert.equal(body.recipientId, ctx.recipient._id);
          assert.equal(body.address, 'new');
        });
    });

    describe('remove recipient provider', () => {

      it('should response with removed', () => {
        return request.delete(`/recipients/${ctx.recipient._id}/providers/push`)
          .expect(200)
          .expect(({ body }) => {
            assert.equal(body[0].recipientId, ctx.recipient._id);
          });
      });

      it('should give nothing', () => {
        return request.get(`/recipients/${ctx.recipient._id}/providers/push`)
          .expect(200)
          .expect(({ body }) => {
            assert.equal(body.length, 0);
          });
      });

    });

  });

});
