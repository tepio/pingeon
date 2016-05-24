const { beforeAll, afterAll } = require('hooks');
const mongoose = require('mongoose');

beforeAll((transactions, done) => {
  mongoose.connect('mongodb://localhost:27017/notificationMicroservice');
  done();
});

afterAll((transactions, done) => {
  // console.log(transactions.map(t => t.name));
  done();
});
