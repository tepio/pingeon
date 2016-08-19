const assert = require('assert');
const pushProvider = require('../src/helpers/push-send');

const token = '5c35a598c08f0e8e3d973714fd00df295db7c555f74ddfb4e60c1fdd7662d602';
const platform = 'ios';
const message = 'Hello!';
const payload = { badge: 5 };

describe('Push', () => {

  it('should be sent', () => {
    return pushProvider
      .send({ platform, token, message, payload })
      .then(() => {
        setTimeout(() => assert(ctx.pushSendSpy.called), 100000);
      });
  });

});
