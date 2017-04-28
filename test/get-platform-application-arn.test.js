const assert = require('assert');
const config = require('smart-config');
const { getPlatformApplicationArn } = require('../src/helpers/aws-utils');

describe('get arn', () => {
  const app = { appName: 'single', name: 'AppStore' };
  const singeAppName = app.appName + app.name;

  describe('single app arn', () => {
    const arn = Date.now().toString();

    before(() => {
      config.set(`push.appsArns.${singeAppName}`, arn);
    });

    it('should return proper arn', () => {
      const res = getPlatformApplicationArn(app);
      assert.equal(res, arn);
    });
  });

  describe('SaaS Enterprise app arn', () => {
    const arn = Date.now().toString();

    before(() => {
      config.set(`push.appsArns.${singeAppName}`, null);
      config.set(`push.appsArns.${app.name}`, arn);
    });

    it('should return proper arn', () => {
      const res = getPlatformApplicationArn(app);
      assert.equal(res, arn);
    });
  });

  describe('Default app arn', () => {
    const defaultApp = config.get('push.defaultApp');
    const arn = config.get(`push.appsArns[${defaultApp}]`);

    it('should return proper arn', () => {
      const res = getPlatformApplicationArn();
      assert.equal(res, arn);
    });
  });

});
