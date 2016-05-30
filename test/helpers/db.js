const mongoose = require('mongoose');
const config = require('../../config/default.json');

let mongooseInstance;

function connect(done) {
  mongooseInstance = mongoose.connect(config.db.url, done);
}

function clean() {
  mongooseInstance.connection.db.dropDatabase();
}

module.exports = { connect, clean };
