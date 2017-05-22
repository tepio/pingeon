require('./test-env');

const message = {
  body: 'testing message :). vanya.',
  recipientNumber: '+13346498383'
};

describe('Send SMS via TWILIO', () => {
  it('should receive status code 201', () => request
    .post('/provider/sms/recipient')
    .send(message)
    .expect(201));
});
