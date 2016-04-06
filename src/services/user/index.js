const service = require('feathers-mongoose');
const user = require('./user-model');
const hooks = require('./hooks');
const serviceBuilder = require('../../helpers/service-builder');

module.exports = function () {
  const app = this;

  const options = {
    Model: user,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/users', service(options));

  serviceBuilder(app).route('/users/custom', 'create', {
    before: [() => console.log('ololo', 'before')],
    method(data, params) {
      return Promise.resolve({ data, params });
    },
    after: [() => console.log('ololo', 'after')]
  });

  // Get our initialize service to that we can bind hooks
  const userService = app.service('/users');

  // Set up our before hooks
  userService.before(hooks.before);

  // Set up our after hooks
  userService.after(hooks.after);
};
