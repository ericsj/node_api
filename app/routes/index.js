const noteRoutes = require('./note_routes').note_routes;

exports.routes = function routes(app, db) {
  noteRoutes(app, db);
};
