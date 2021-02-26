const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

app.listen(PORT, () => console.log('NODE server running on '+PORT));