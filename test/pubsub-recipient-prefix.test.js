require('./test-env');

const prefix = 'some-';
const messageForSingle = { field: 'some' };
const messageForBatch = { field: 'another' };
const recipientId = String(helpers.randomId());
const pubsub = require('../src/helpers/pubsub');

describe('Pubsub recipient prefix', () => {

  before(() => {
    pubsub.sub(prefix + recipientId, res => {
      ctx.message = res;
    });
  });
  
  describe('single request', () => {

    it('should publish', () => request
      .post('/provider/pubsub/recipient/prefix')
      .send({ recipientId, message: messageForSingle, prefix })
      .expect(201));

    it('should receive message on subscribe', done => setTimeout(() => {
      assert.deepEqual(ctx.message, messageForSingle);
      done();
    }, 300));
  });

  describe('batch request', () => {
    
    it('should publish', () => request
      .post('/notification/batch')
      .send({
        recipients: [recipientId],
        providers: { pubsub: { message: messageForBatch, prefix } }
      })
      .expect(201));

    it('should receive message on subscribe', done => setTimeout(() => {
      assert.deepEqual(ctx.message, messageForBatch);
      done();
    }, 300));
  });

});
