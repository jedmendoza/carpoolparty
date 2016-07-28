var makeCarpoolBtn = document.getElementById('carpool-btn');
var carpoolDiv = document.getElementById('carpool-info');
var cancel = document.getElementById('cancel-ride');
var rideInfo = document.getElementById('ride-info');
var submitRide = document.getElementById('submit-ride');
var festival = document.getElementById('festival-name');
// var rideInfo = document.getElementById('ride-info');


makeCarpoolBtn.addEventListener('click', function(e) {
  $('#carpool-info').removeClass('hidden')
});

submitRide.addEventListener('click', function(e) {
  var rideDetails = [];
  rideDetails.venue = festival.value;
  rideDetails.info = rideInfo.value;
  console.log(rideDetails);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/carpool');
  xhr.setRequestHeader('')
  xhr.send()
});

cancel.addEventListener('click', function(e) {
  rideInfo.value = '';
  festiv
  $('#carpool-info').addClass('hidden')
});
