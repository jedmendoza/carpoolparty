var makeCarpoolBtn = $('#carpool-btn');
// var carpoolDiv = document.getElementById('carpool-info');
var cancel = document.getElementById('cancel-ride');
var rideInfo = document.getElementById('ride-info');
var submitRide = document.getElementById('submit-ride');
var festival = document.getElementById('festival-name');
var ride = document.getElementById('hitch');
var newCarpool = $('#new-carpool');
var seats = document.getElementById('seats');
// var rideInfo = document.getElementById('ride-info');

makeCarpoolBtn.on('click', function(e) {
  $('#carpool-info').removeClass('hidden')
});

//Sends ridedetails into MongoDB
newCarpool.on('submit', function(e) {

  e.preventDefault();

  var rideDetails = {};
  var chatId = Date.now();
  console.log(chatId)

  rideDetails.venue = festival.value;
  rideDetails.info = rideInfo.value;
  rideDetails.chatId = chatId;
  rideDetails.seats = seats.value;

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/rides/create');
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify(rideDetails));

  rideInfo.value = '';

  $('#carpool-info').addClass('hidden');

  xhr.addEventListener('load', function() {
    var response = JSON.parse(xhr.response);
    console.log(response.venue);

    var rideDiv = document.createElement('div');
    rideDiv.setAttribute('class', 'col-md-3');

    var ridePanel = document.createElement('div');
    ridePanel.setAttribute('class', 'panel panel-default');

    var body = document.createElement('div');
    body.setAttribute('class', 'panel-body');

    var info = document.createElement('p');
    info.textContent = response.info;

    var buttons = document.createElement('button');
    button.setAttribute('')

    ride.appendChild(rideDiv);
    rideDiv.appendChild(ridePanel);
    ridePanel.appendChild(body);
    body.appendChild(info);

  });
});

cancel.addEventListener('click', function(e) {
  rideInfo.value = '';
  $('#carpool-info').addClass('hidden')
});

// function makeRide() {
//   var rideDiv = document.createElement('div');
//   rideDiv.setAttribute('class', 'col-md-3');
//
//   var ridePanel = document.createElement('div');
//   ridePanel.setAttribute('class', 'panel panel-default');
//
//   var body = document.createElement('div');
//   body.setAttribute('class', 'panel-body');
//
//   var info = document.createElement('p');
//   info.textContent = response;
//
//   ride.appendChild(rideDiv);
//   rideDiv.appendChild(ridePanel);
//   ridePanel.appendChild(body);
//   body.appendChild(info);
//
// }
