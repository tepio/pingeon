require('./test-env');
const validate = require('../src/services/provider/validations/batch-notify-data');

describe('Batch notify data validation', () => {

  describe('batch request', () => {
    it('should have a providers', () => {
      assert(!validate({ data: {} }).isValid);
    });

    it('should have not empty providers', () => {
      assert(!validate({ data: { providers: {} } }).isValid);
    });

    describe('providers object', () => {

      it('should have valid email', () => {
        assert(validate({ data: { providers: { email: { template: '' } } } }).isValid);
      });
      
      it('should have valid push', () => {
        assert(validate({ data: { providers: { push: { message: '' } } } }).isValid);
      });
      
      it('should have valid pubsub', () => {
        assert(validate({ data: { providers: { pubsub: { message: '' } } } }).isValid);
      });

    });

  });

});
