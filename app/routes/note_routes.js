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
 * returns an ObjectID from a request
 * @param {object} request
 * @return {object} ObjectID
 */
function requestToObjectId(request) {
  const ObjectID = require('mongodb').ObjectID;
  const ID = request.params.id;
  const DETAILS = {'_id': new ObjectID(ID)};
  return DETAILS;
}

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

/**
 * returns result of an Retrieve operation(GET)
 * @param {object} err - db error
 * @param {object} item - db result
 * @param {object} response - response request
 */
function returnGetResult(err, item, response) {
  if (err) {
    response.send({'error': 'An error has occured'});
  } else {
    response.send(item);
  }
}

exports.note_routes = function(app, db) {
  app.post('/notes', (request, response) => {
    db.collection('notes').insert(requestToNote(request), (err, result) => {
      returnPostResult(err, result, response);
    });
  });
  app.get('/notes/:id', (request, response) => {
    db.collection('notes').findOne(requestToObjectId(request), (err, item) => {
      returnGetResult(err, item, response);
    });
  });
};
