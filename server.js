const routes = require('./app/routes/index').routes;
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({extended: true}));
routes(app, {});
app.listen(PORT, () => {
  console.log('NODE server running on '+PORT);
});
