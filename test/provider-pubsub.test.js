require('./test-env');
const message = { some: 'lol' };
const channel = 'some';

describe('Provider pubsub', () => {

  describe('notify channel', () => {

    it('should send message', () => {
      return request.post('/provider/pubsub/channel/' + channel)
        .send(message)
        .expect(201)
        .expect(({ body }) => {
          assert.deepEqual(body.message, message);
          assert.equal(body.channel, channel);
          assert.equal(body.statusCode, 200);
        });
    });

  });

});
