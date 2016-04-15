require('./test-env');

const createEndpointStub = sinon.stub();
const publishStub = sinon.stub();

sinon.stub(require('aws-sdk'), 'SNS', () => ({
  createPlatformEndpointAsync: createEndpointStub,
  publishAsync: publishStub
}));

const pushProvider = require('../src/providers/push')(app);
const { queueClient, PUSH_SENT, PUSH_SENT_FAIL } = require('../src/helpers/queue')(app);
const platform = 'android';
const token = String(new Date());
const message = 'Hello!';
const payload = { badge: 5 };
const error = { message: 'Uh oh!' };

describe('Push send', () => {

  describe('success', () => {

    before(() => {
      createEndpointStub.returns({ EndpointArn: '1' });
      publishStub.returns({ MessageId: '2' });
    });

    before(() => {
      return pushProvider
        .send({ platform, token, message, payload })
        .then(res => {
          ctx.pushSendRes = res;
        });
    });

    const assertSentResult = (res) => {
      assert.equal(res.platform, platform);
      assert.equal(res.message, message);
      assert.equal(res.token, token);
      assert.deepEqual(res.payload, payload);
      assert.ok(res.PlatformApplicationArn);
      assert.ok(res.providerMessageId);
      assert.ok(res.sendDate);
    };

    it('should be sent', done => {
      queueClient(PUSH_SENT).subscribe(res => {
        assertSentResult(res);
        assertSentResult(ctx.pushSendRes);
        done();
      });
    });

  });

  describe('fail', () => {

    before(() => {
      createEndpointStub.returns({ EndpointArn: '1' });
      publishStub.throws(error);
    });

    before(() => {
      pushProvider.send({ platform, token, message, payload });
    });

    it('should be fail', done => {
      queueClient(PUSH_SENT_FAIL).subscribe(res => {
        assert.deepEqual(res, error);
        done();
      });
    });

  });

});
