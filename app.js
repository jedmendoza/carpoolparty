var express = require('express');
var bodyParser = require('body-parser').json();
var Client = require('mongodb').MongoClient;
var app = express();

var url = 'mongodb://localhost:27017/carpoolparty';


app.use(express.static('./public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/carpool', function(req, res) {
  Client.connect(url, function(error, db) {
    if (error) {
      console.log(error);
      res.send(404)
    } else {
      res.send()
      console.log('post route is working')
    }
  })
});

app.listen(8080);
