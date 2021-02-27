const routes = require('./app/routes/index').routes;
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/db').configs;
const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({extended: true}));
MongoClient.connect(dbConfig.url, (err, database) => {
  if (err) return console.log(err);
  const db = database.db('notes_db');
  routes(app, db);
});
app.listen(PORT, () => {
  console.log('NODE server running on '+PORT);
});
