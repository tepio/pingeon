const { beforeAll, afterAll, beforeEach } = require('hooks');
const db = require('../../helpers/db');

beforeAll((transactions, done) => {
  db.connect(() => {
    db.clean();
    done();
  });
});

beforeEach((transactions, done) => {
  done();
});

afterAll((transactions, done) => {
  // For debugging:
  // console.log(transactions.map(t => t.name));
  done();
});
