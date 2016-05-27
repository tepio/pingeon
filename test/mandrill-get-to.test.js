require('./test-env');

const { getTo } = require('../src/helpers/mandrill-utils');
const email = 'test@tep.io';
const to = ['to@tep.io'];
const cc = ['c@tep.io', 'd@tep.io'];
const bcc = ['q@tep.io', 'l@tep.io'];

describe('Mandrill get to', () => {

  it('email', () => {
    assert.deepEqual(getTo({ email }), [{ email }]);
  });

  it('to', () => {
    assert.deepEqual(getTo({ to }), [{ email: 'to@tep.io' }]);
  });

  it('cc', () => {
    assert.deepEqual(getTo({ cc }), [{ email: 'c@tep.io', type: 'cc' }, { email: 'd@tep.io', type: 'cc' }]);
  });

  it('bcc', () => {
    assert.deepEqual(getTo({ bcc }), [{ email: 'q@tep.io', type: 'bcc' }, { email: 'l@tep.io', type: 'bcc' }]);
  });

  it('all', () => {
    assert.deepEqual(getTo({ email, to, cc, bcc }), [
      { email: 'test@tep.io' },
      { email: 'to@tep.io' },
      { email: 'c@tep.io', type: 'cc' },
      { email: 'd@tep.io', type: 'cc' },
      { email: 'q@tep.io', type: 'bcc' },
      { email: 'l@tep.io', type: 'bcc' }
    ]);
  });

});
