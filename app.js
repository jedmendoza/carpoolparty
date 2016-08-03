var express = require('express');
var bodyParser = require('body-parser');
var Client = require('mongodb').MongoClient;
var app = express();

var url = 'mongodb://localhost:27017/carpoolparty';
var jsonParser = bodyParser.json();

app.use(express.static('./public'));

app.use(jsonParser);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.get('/rides', function(req, res) {
  Client.connect(url, function(error, db) {
    var rides = db.collection('rides');
    if (error) {
      res.send(500);
      db.close()
    } else {
      rides.find({}).toArray(function(error, result) {
        if (error) {
          res.send(500);
          db.close();
        } else {
          res.json(result);
          db.close()
        }
      })
    }
  });
});

app.post('/rides/create', function(req, res) {
  Client.connect(url, function(error, db) {
    var rides = db.collection('rides');
    if (error) {
      res.send(500);
      db.close()
    } else {
      rides.insert(
        {venue: req.body.venue, info: req.body.info, chatId: req.body.chatId, seats: req.body.seats},
        function(error, result) {
          res.json(result.ops[0]);
          db.close()
        }
      )
    }
  });
});

app.put('/rides/:chatId', function(req, res) {
  Client.connect(url, function(error, db) {
    var rides = db.collection('rides');
    if (error) {
      res.send(500)
      db.close()
    } else {
      var theId = parseInt(req.params.chatId);
      rides.update({chatId: theId},
      {$inc: {seats: -1}}, {upsert: true}, function(error, result) {
        rides.find({}).toArray(function(error, result) {
          res.json(result)
          db.close();
        });
      })
    }
  });
});


//continue to work on this.


app.listen(8080);
