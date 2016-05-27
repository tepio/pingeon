require('./test-env');

const { getVars } = require('../src/helpers/mandrill-utils');

describe('Mandrill get vars', () => {

  it('no arg', () => {
    assert.deepEqual(getVars(), []);
  });

  it('empty object', () => {
    assert.deepEqual(getVars({}), []);
  });

  it('one value', () => {
    assert.deepEqual(getVars({ key: 'value' }), [{ name: 'key', content: 'value' }]);
  });

  it('many values', () => {
    assert.deepEqual(getVars({ a: 'A', b: 'B' }), [{ name: 'a', content: 'A' }, { name: 'b', content: 'B' }]);
  });

});
