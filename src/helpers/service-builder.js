module.exports = function (app) {

  return {
    route(route, methodName, { before, method, after }) {
      app.service(route, { [methodName]: method })
        .before({ [methodName]: before })
        .after({ [methodName]: after });
    }
  };

};
