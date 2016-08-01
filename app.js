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

// app.get('/', function(req, res) {
//   Client.connect(url, function(error, db) {
//     var rides = db.collection('rides');
//     rides.find({}).toArray(function(error, result) {
//       console.log(result)
//     })
//   })
//   // res.sendFile(__dirname + '/index.html');
//   // res.send()
//   res.end()
// });

app.get('/test', function(req, res) {
  Client.connect(url, function(error, db) {
    var rides = db.collection('rides');
    if (error) {
      console.log(error);
      res.send(404);
      db.close()
    } else {
      rides.find({venue: ''}).toArray(function(error, result) {
        db.close();
        res.send(result);
        // console.log(result)
      })
    }
  });
});

app.post('/carpool/create', function(req, res) {
  Client.connect(url, function(error, db) {
    var rides = db.collection('rides');
    if (error) {
      console.log(error);
      res.send(404);
      db.close()
    } else {
      // console.log(req.body)
      rides.insert(
        {venue: req.body.venue, info: req.body.info, id: req.body.id},
        function(error, result) {
          // res.send(result);
          console.log(result);
          db.close()
        }
      )
    }
  });
});

app.listen(8080);
