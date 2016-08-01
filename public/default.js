var cancel = document.getElementById('cancel-ride');
var submitRide = document.getElementById('submit-ride');

var makeCarpoolBtn = $('#carpool-btn');
var rideInfo = $('#ride-info');
var festival = $('#festival-name');
var ride = document.getElementById('hitch');
var newCarpool = $('#new-carpool');
var seats = $('#seats');

makeCarpoolBtn.on('click', function(e) {
  $('#carpool-info').removeClass('hidden')
});

//Sends ridedetails into MongoDB
newCarpool.on('submit', function(e) {

  e.preventDefault();

  var rideDetails = {};
  var chatId = Date.now();
  console.log(chatId)

  rideDetails.venue = festival.val();
  rideDetails.info = rideInfo.val();
  rideDetails.chatId = chatId;
  rideDetails.seats = seats.val();

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/rides/create');
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify(rideDetails));

  resetRide();

  $('#carpool-info').addClass('hidden');

  xhr.addEventListener('load', function() {
    var response = JSON.parse(xhr.response);
    console.log(response.venue);

    var rideDiv = document.createElement('div');
    rideDiv.className = 'col-md-3';
    rideDiv.setAttribute('id', response.chatId)

    var ridePanel = document.createElement('div');
    ridePanel.className = 'panel panel-default'

    var heading = document.createElement('div');
    heading.className = 'panel-heading text-center'
    heading.textContent = response.venue;

    var body = document.createElement('div');
    body.className = 'panel-body'

    var info = document.createElement('p');
    info.textContent = response.info;

    var toolbar = document.createElement('div');
    toolbar.className = 'btn-toolbar';

    var btnDiv = document.createElement('div');
    btnDiv.className = 'btn-group';

    var join = document.createElement('button');
    join.className = 'btn';
    join.textContent = "Join";

    var chat = document.createElement('button');
    chat.className = 'btn';
    chat.textContent = "Chat";

    toolbar.appendChild(btnDiv);
    btnDiv.appendChild(join);
    btnDiv.appendChild(chat);


    // var buttons = document.createElement('button');
    // button.setAttribute('')

    ride.appendChild(rideDiv);
    rideDiv.appendChild(ridePanel);
    ridePanel.appendChild(heading);
    ridePanel.appendChild(body);
    body.appendChild(info);
    body.appendChild(toolbar);

  });
});

cancel.addEventListener('click', function(e) {
  rideInfo.value = '';
  $('#carpool-info').addClass('hidden')
});

function resetRide() {
  festival.val('Coachella');
  rideInfo.val("");
  seats.val('1');
}

function getSeats(response) {
}
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
