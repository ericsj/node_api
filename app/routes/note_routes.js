exports.note_routes = function(app, db) {
  app.post('/notes', (req, res) => {
    console.log(req.body);
    res.send('Hello');
  });
};
