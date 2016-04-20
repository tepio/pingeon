require('./test-env');

ctx.recipientProvider = {
  deviceId: 'deviceId',
  address: 'deviceToken',
  platform: 'android'
};

describe('Recipient', () => {

  describe('create', () => {

    it('creates recipient with id', () => {
      return request.post('/recipients').send()
        .expect(201)
        .expect(({ body }) => {
          assert.ok(body._id);
          ctx.recipient = body;
        });
    });

    it('creates recipient provider', () => {
      return request.post(`/recipients/${ctx.recipient._id}/providers/push`)
        .send(ctx.recipientProvider)
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
