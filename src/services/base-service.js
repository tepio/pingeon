const { Service } = require('feathers-mongoose');

class PingeonMongooseService extends Service {
  create(data, params) {
    if (!data.id) return super.create(data, params);

    data._id = data.id;
    delete data.id;

    return super.create(data, params);
  }
}

module.exports = PingeonMongooseService;
