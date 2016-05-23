require('./test-env');

const { createEndpointStub, publishStub } = mocks.awsStub.getStubs();

const pushProvider = require('../src/helpers/push-send');
const pushReceiveStatus = require('../src/helpers/push-receive-status');
const { queueClient, PUSH_SENT_FAIL } = require('../src/helpers/queue');
const platform = 'android';
const token = String(new Date());
const message = 'Hello!';
const payload = { badge: 5 };
const error = { message: 'Uh oh!' };

describe('Push', () => {

  before(() => ctx.pushSendSpy = sinon.spy(pushProvider, 'send'));
  after(() => ctx.pushSendSpy.restore());

  describe('send', () => {

    describe('success', () => {
      
      before(() => {
        createEndpointStub.returns({ EndpointArn: '1' });
        publishStub.returns({ MessageId: '2' });
      });

      before(() => {
        return pushProvider
          .send({ platform, token, message, payload })
          .then(res => {
            assert.equal(res.platform, platform);
            assert.equal(res.message, message);
            assert.equal(res.token, token);
            assert.deepEqual(res.payload, payload);
            assert.ok(res.platformApplicationArn);
            assert.ok(res.providerMessageId);
            assert.ok(res.sendDate);
          });
      });

      it('should be sent', () => {
        assert(ctx.pushSendSpy.called);
      });

    });

    describe.skip('fail', () => {

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

  describe.skip('receive status', function () {
    this.timeout(10000);

    it('should return status', () => {
      return pushReceiveStatus
        .get({
          providerMessageId: '49f7e242-2412-594c-86e8-adcdd25dbba1',
          platformApplicationArn: 'arn:aws:sns:us-east-1:093525834944:app/APNS_SANDBOX/outfit-development'
        })
        .then(res => {
          assert.ok(res.received);
          assert.ok(res.receiveStatus);
        });
    });

  });

});
