var makeCarpoolBtn = document.getElementById('carpool-btn');
var carpoolDiv = document.getElementById('carpool-info');
var cancel = document.getElementById('cancel-ride');
var rideInfo = document.getElementById('ride-info');
var submitRide = document.getElementById('submit-ride');
var festival = document.getElementById('festival-name');
var ride = document.getElementById('hitch');
// var rideInfo = document.getElementById('ride-info');


makeCarpoolBtn.addEventListener('click', function(e) {
  $('#carpool-info').removeClass('hidden')
});

submitRide.addEventListener('click', function(e) {

  var rideDetails = {};
  var rideId = Date.now();

  rideDetails.venue = festival.value;
  rideDetails.info = rideInfo.value;
  rideDetails.id = rideId;

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/carpool');
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify(rideDetails));

  makeRide();

  $('#carpool-info').addClass('hidden');

  xhr.addEventListener('load', function() {

  })

});

cancel.addEventListener('click', function(e) {
  rideInfo.value = '';
  festiv
  $('#carpool-info').addClass('hidden')
});

function makeRide() {
  var rideDiv = document.createElement('div');
  rideDiv.setAttribute('class', 'col-md-3');

  var ridePanel = document.createElement('div');
  ridePanel.setAttribute('class', 'panel panel-default');

  var body = document.createElement('div');
  body.setAttribute('class', 'panel-body');

  var text = document.createElement('p');
  text.setAttribute('text', festival.venue)

  ride.appendChild(rideDiv);
  rideDiv.appendChild(ridePanel);
  ridePanel.appendChild(body);
  body.appendChild(text);
}
