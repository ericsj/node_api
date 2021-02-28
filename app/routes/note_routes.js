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
 * returns result of a CRUD operation
 * @param {object} err - db error
 * @param {object} response - response request
 * @param {string|object} message - return message
 */
function returnCrudResult(err, response, message) {
  if (err) {
    response.send({'error': 'An error has occured'});
  } else {
    response.send(message);
  }
}

exports.noteRoutes = function(app, db) {
  app.post('/notes', (request, response) => {
    db.collection('notes').insert(requestToNote(request), (err, result) => {
      returnCrudResult(
          err,
          response,
          result.ops[0],
      );
    });
  });

  app.get('/notes/:id', (request, response) => {
    db.collection('notes').findOne(requestToObjectId(request), (err, item) => {
      returnCrudResult(
          err,
          response,
          item,
      );
    });
  });

  app.delete('/notes/:id', (request, response) => {
    db.collection('notes').deleteOne(
        requestToObjectId(request),
        (err, item) => {
          let message;
          if (item.result.n == 1) {
            message = 'Note ' + request.params.id + ' deleted!';
          } else {
            message = 'No note was found with the given ID';
          }
          returnCrudResult(
              err,
              response,
              message,
          );
        },
    );
  });
};
