require('./test-env');

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
      return request.post(`/recipients/${ctx.recipient._id}/providers`)
        .send({ channel: 'test', key: 'some' })
        .expect(201)
        .expect(({ body }) => {
          ctx.recipientProvider = body;
          assert.equal(body.recipientId, ctx.recipient._id);
        });
    });

    it('get recipient provider', () => {
      return request.get(`/recipients/${ctx.recipient._id}/providers`)
        .expect(200)
        .expect(({ body }) => {
          assert.equal(body[0].recipientId, ctx.recipient._id);
        });
    });

    it('update recipient provider', () => {
      return request.put(`/recipients/${ctx.recipient._id}/providers/${ctx.recipientProvider._id}`)
        .send({ ...ctx.recipientProvider, channel: 'new' })
        .expect(200)
        .expect(({ body }) => {
          assert.equal(body.recipientId, ctx.recipient._id);
          assert.equal(body.channel, 'new');
        });
    });

    it('patch recipient provider', () => {
      return request.patch(`/recipients/${ctx.recipient._id}/providers/${ctx.recipientProvider._id}`)
        .send({ channel: 'new' })
        .expect(200)
        .expect(({ body }) => {
          assert.equal(body.recipientId, ctx.recipient._id);
          assert.equal(body.channel, 'new');
        });
    });

    describe('remove recipient provider', () => {

      it('should response with removed', () => {
        return request.delete(`/recipients/${ctx.recipient._id}/providers`)
          .expect(200)
          .expect(({ body }) => {
            assert.equal(body[0].recipientId, ctx.recipient._id);
          });
      });

      it('should give nothing', () => {
        return request.get(`/recipients/${ctx.recipient._id}/providers`)
          .expect(200)
          .expect(({ body }) => {
            assert.equal(body.length, 0);
          });
      });

    });

  });

});
