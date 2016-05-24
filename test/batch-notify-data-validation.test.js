require('./test-env');
const validate = require('../src/services/provider/validations/batch-notify-data');

describe('Batch notify data validation', () => {

  describe('batch request', () => {
    it('should have a message', () => {
      assert(!validate({ data: {} }).isValid);
    });

    it('should have recipients', () => {
      assert(!validate({ data: { message: 'some' } }).isValid);
    });

    it('should have not empty recipients array', () => {
      assert(!validate({ data: { message: 'some', recipients: [] } }).isValid);
    });

    it('should have recipients as objects', () => {
      assert(!validate({ data: { message: 'some', recipients: ['some'] } }).isValid);
    });

    describe('recipient object', () => {

      it('should have provider and data fields', () => {
        assert(!validate({ data: { message: 'some', recipients: [{ provider: '' }] } }).isValid);
        assert(!validate({ data: { message: 'some', recipients: [{ data: {} }] } }).isValid);
      });

      it('should have provider as string', () => {
        assert(!validate({ data: { message: 'some', recipients: [{ provider: {}, data: {} }] } }).isValid);
      });

      describe('data object', () => {

        it('should have channel for fanout', () => {
          assert(!validate({ data: { message: 'some', recipients: [{ provider: 'fanout', data: {} }] } }).isValid);
          assert.ok(validate({
            data: {
              message: 'some',
              recipients: [{ provider: 'fanout', data: { channel: 'some' } }]
            }
          }).isValid);
        });

        it('should have template for email', () => {
          assert(!validate({ data: { message: 'some', recipients: [{ provider: 'email', data: {} }] } }).isValid);
          assert.ok(validate({
            data: {
              message: 'some',
              recipients: [{ provider: 'email', data: { template: 'some' } }]
            }
          }).isValid);
        });

      });

    });

  });

});
