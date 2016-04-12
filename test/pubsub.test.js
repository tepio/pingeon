require('./test-env');

const pubsub = require('../src/helpers/pubsub')();
const channel = 'some';
const message = { field: 'some' };

describe('Pubsub', () => {

  it('should publish and subscribe', done => {
    pubsub.sub(channel).then(res => {
      assert.deepEqual(res, message);
      done();
    });

    pubsub.pub(channel, message);
  });

});
