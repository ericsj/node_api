const noteRoutes = require('./note_routes').noteRoutes;

exports.routes = function routes(app, db) {
  noteRoutes(app, db);
};
