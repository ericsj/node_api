exports.note_routes = function(app, db) {
  app.post('/notes', (req, res) => {
    const note = {
      title: req.body.title,
      body: req.body.body,
    };
    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send({'error': 'An error has occured'});
      } else {
        res.send(result.ops[0]);
      }
    });
    console.log(req.body);
  });
};
