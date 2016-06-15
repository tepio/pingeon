const assert = require('assert');
const pushProvider = require('../src/helpers/push-send');

const token = '269c08d4a47ed4575ee6b6dfddcad58c487c51b1ba4b47d40430391343ed7dc0';
const platform = 'ios';
const message = 'Hello!';
const payload = { badge: 5 };

describe.skip('Push', () => {

  it('should be sent', () => {
    return pushProvider
      .send({ platform, token, message, payload })
      .then(() => {
        setTimeout(() => assert(ctx.pushSendSpy.called), 5000);
      });
  });

});
