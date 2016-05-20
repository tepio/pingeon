const { beforeAll } = require('hooks');
const mongoose = require('mongoose');

beforeAll((transactions, done) => {
  mongoose.connect('mongodb://localhost:27017/notificationMicroservice');
  done();
});
