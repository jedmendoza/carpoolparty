var express = require('express');
var bodyParser = require('body-parser').json();
var Client = require('mongodb').MongoClient;
var app = express();

app.use(express.static('./public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/carpool', function(req, res) {
  console.log('post route is working')
  res.send('')
});

app.listen(8080);
