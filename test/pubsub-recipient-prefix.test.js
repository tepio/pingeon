require('./test-env');

const prefix = 'some-';
const messageForSingle = { field: 'some' };
const messageForBatch = { field: 'another' };
const recipientId = String(helpers.randomId());
const pubsubConfig = require('smart-config').get('pubsub');
const pubsub = require('../src/helpers/pubsub')();
const service = pubsubConfig;

describe('Pubsub recipient prefix', () => {

  before(() => {
    pubsub.sub(prefix + recipientId, (res) => {
      ctx.message = res;
    }, (config) => {
      ctx.config = config;
    });
  });

  describe('single request', () => {

    it('should publish', () => request
      .post('/provider/pubsub/recipient/prefix')
      .set('x-location-group', 'location1')
      .send({ recipientId, message: messageForSingle, prefix, service })
      .expect(201));

    it('should receive message on subscribe', done => setTimeout(() => {
      assert.deepEqual(ctx.message, messageForSingle);
      assert.deepEqual(ctx.config, pubsubConfig);
      done();
    }, 300));
  });

  describe('batch request', () => {

    it('should publish', () => request
      .post('/notification/batch')
      .set('x-location-group', 'location1')
      .send({
        recipients: [recipientId],
        providers: { pubsub: { message: messageForBatch, prefix, service } }
      })
      .expect(201));

    it('should receive message on subscribe', (done) => setTimeout(() => {
      assert.deepEqual(ctx.message, messageForBatch);
      assert.deepEqual(ctx.config, pubsubConfig);
      done();
    }, 300));
  });

});
