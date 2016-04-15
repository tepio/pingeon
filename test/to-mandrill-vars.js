require('./test-env');

const toMandrillVars = require('../src/helpers/to-mandrill-vars');

describe('Helpers', () => {

  describe('Object to mandrill vars', () => {

    it('no arg', () => {
      assert.deepEqual(toMandrillVars(), []);
    });
    
    it('empty object', () => {
      assert.deepEqual(toMandrillVars({}), []);
    });

    it('one value', () => {
      assert.deepEqual(toMandrillVars({ key: 'value' }), [{ name: 'key', content: 'value' }]);
    });

    it('many values', () => {
      assert.deepEqual(toMandrillVars({ a: 'A', b: 'B' }), [{ name: 'a', content: 'A' }, { name: 'b', content: 'B' }]);
    });

  });
  
});
