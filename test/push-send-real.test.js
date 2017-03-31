const assert = require('assert');
const pushProvider = require('../src/helpers/push-send');

const token = 'd387VFC_RBs:APA91bFTfo0-GYuOpRHmaPqyERHKJGpOtHhUib9unDTzwr9DRqUO5scoh2ffftzI4DIEnNom4szjVImQWljVy7B1l' +
  'nMuQfd-WD6IS727ewCcx3Yp227qsJiv03fHsHfTtfOANhpz2vEX';
const platform = 'android';
const locationGroup = 'location1';
const app = 'android';
const message = 'Hello!';
const payload = { badge: 5 };

describe('Push', () => {

  it('should be sent', () => {
    return pushProvider
      .send({ platform, token, message, payload, app, locationGroup })
      .then(() => {
        setTimeout(() => assert(ctx.pushSendSpy.called), 100000);
      });
  });

});
