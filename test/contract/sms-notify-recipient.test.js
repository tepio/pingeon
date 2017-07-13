require('../test-env');

const message = {
  body: 'testing message :). vanya.',
  recipientNumber: '' // need your phone number
};

describe('Send SMS via TWILIO', () => {
  it('should receive status code 201', () => request
    .post('/provider/sms/recipient')
    .send(message)
    .expect(201));
});
