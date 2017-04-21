require('./test-env');

const pubsub = require('../src/helpers/pubsub')();
const pubsubConfig = require('smart-config').get('pubsub');

const service = pubsubConfig;
const channel = Date.now().toString();
const messageForSingle = { field: 'some' };
const messageForBatch = { field: 'another' };

describe('Pubsub recipient prefix', () => {

  before(() => {
    pubsub.sub(channel, (res) => {
      ctx.message = res;
    }, (config) => {
      ctx.config = config;
    });
  });

  describe('single request', () => {

    it('should publish', () => request
      .post('/provider/pubsub/channel')
      .set('x-location-group', 'location1')
      .send({ message: messageForSingle, channel, service })
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
        providers: { pubsub: { channels: [channel], message: messageForBatch, service } }
      })
      .expect(201));

    it('should receive message on subscribe', (done) => setTimeout(() => {
      assert.deepEqual(ctx.message, messageForBatch);
      assert.deepEqual(ctx.config, pubsubConfig);
      done();
    }, 300));
  });

});
