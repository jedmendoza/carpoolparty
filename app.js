var express = require('express');
var bodyParser = require('body-parser');
var Client = require('mongodb').MongoClient;
var app = express();

var url = 'mongodb://localhost:27017/carpoolparty';
var jsonParser = bodyParser.json();

app.use(express.static('./public'));

app.use(jsonParser);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/carpool', function(req, res) {
  Client.connect(url, function(error, db) {
    var rides = db.collection('rides');
    if (error) {
      console.log(error);
      res.send(404);
      db.close()
    } else {
      console.log(req.body)
      rides.insert(
        {venue: req.body.venue, info: req.body.info, id: req.body.id},
        function(error, result) {
          res.send(result);
          db.close()
        }
      )
    }
  });
});

app.listen(8080);
