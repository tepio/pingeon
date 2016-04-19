require('./test-env');

const awsUtils = require('../src/helpers/aws-utils')(app);

describe('AWS utils', () => {

  describe('getLogGroup', () => {

    const arn = 'arn:aws:sns:us-east-1:093525834944:app/APNS_SANDBOX/outfit-development';
    const logGroup = 'sns/us-east-1/093525834944/app/APNS_SANDBOX/outfit-development';
    
    it('should generate right log group', () => {
      assert.deepEqual(awsUtils.getLogGroup(arn), logGroup);
    });

  });
  
});
