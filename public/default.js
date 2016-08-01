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

// window.addEventListener('load', function() {
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', '/test');
//   xhr.send();
//   console.log('you are here');
//
//   xhr.addEventListener('load', function() {
//     var response = xhr.response;
//     console.log(response);
//   })
// })

//Sends ridedetails into MongoDB
submitRide.addEventListener('click', function(e) {

  var rideDetails = {};
  var rideId = Date.now();

  rideDetails.venue = festival.value;
  rideDetails.info = rideInfo.value;
  rideDetails.id = rideId;

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/carpool/create');
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify(rideDetails));

  $('#carpool-info').addClass('hidden');

  xhr.addEventListener('load', function() {
    var response = JSON.parse(xhr.response);
    console.log(response);
    console.log(response.ops.info);

    var rideDiv = document.createElement('div');
    rideDiv.setAttribute('class', 'col-md-3');

    var ridePanel = document.createElement('div');
    ridePanel.setAttribute('class', 'panel panel-default');

    var body = document.createElement('div');
    body.setAttribute('class', 'panel-body');

    var info = document.createElement('p');
    info.textContent = response.info;

    ride.appendChild(rideDiv);
    rideDiv.appendChild(ridePanel);
    ridePanel.appendChild(body);
    body.appendChild(info);


  })

});

cancel.addEventListener('click', function(e) {
  rideInfo.value = '';
  $('#carpool-info').addClass('hidden')
});

function makeRide() {
  var rideDiv = document.createElement('div');
  rideDiv.setAttribute('class', 'col-md-3');

  var ridePanel = document.createElement('div');
  ridePanel.setAttribute('class', 'panel panel-default');

  var body = document.createElement('div');
  body.setAttribute('class', 'panel-body');

  var info = document.createElement('p');
  info.textContent = response;

  ride.appendChild(rideDiv);
  rideDiv.appendChild(ridePanel);
  ridePanel.appendChild(body);
  body.appendChild(info);

}
