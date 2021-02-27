/**
 * Generates a note object from a request
 * @param {object} request - request received
 * @return {object} note - note object that will be sent to database
 */
function requestToNote(request) {
  const note = {
    title: request.body.title,
    body: request.body.body,
  };
  return note;
};

/**
 * returns result of an Insert operation(POST)
 * @param {object} err - db error
 * @param {object} result - db result
 * @param {object} response - response request
 */
function returnPostResult(err, result, response) {
  if (err) {
    response.send({'error': 'An error has occured'});
  } else {
    response.send(result.ops[0]);
  }
}

exports.note_routes = function(app, db) {
  app.post('/notes', (request, response) => {
    db.collection('notes').insert(requestToNote(request), (err, result) => {
      returnPostResult(err, result, response);
    });
  });
};
