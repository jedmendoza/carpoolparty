var cancel = document.getElementById('cancel-ride');
var submitRide = document.getElementById('submit-ride');
var makeCarpoolBtn = $('#carpool-btn');
var rideInfo = $('#ride-info');
var festival = $('#festival-name');
var ride = document.getElementById('hitch');
var newCarpool = $('#new-carpool');
var seats = $('#seats');
var hitch = document.getElementById('hitch');
var landing = $('#landing');

function resetRide() {
  festival.val('Coachella');
  rideInfo.val("");
  seats.val('1');
};

function makeRide(response) {
  var rideDiv = document.createElement('div');
  rideDiv.className = 'col-md-3';

  var ridePanel = document.createElement('div');
  ridePanel.className = 'panel panel-default'

  var heading = document.createElement('div');
  heading.className = 'panel-heading text-center'
  heading.textContent = response.venue;

  var body = document.createElement('div');
  body.className = 'panel-body';
  body.textContent = response.info;

  var info = document.createElement('h3');
  info.textContent = 5-response.seats + '/5';
  info.setAttribute('id', 'count' + response.chatId)

  var toolbar = document.createElement('div');
  toolbar.className = 'btn-toolbar';

  var btnDiv = document.createElement('div');
  btnDiv.className = 'btn-group';

  var join = document.createElement('button');
  join.className = 'btn';
  join.textContent = "Join";
  join.setAttribute('data-id', 'join' + response.chatId)

  var chat = document.createElement('button');
  chat.className = 'btn';
  chat.textContent = "Chat";
  chat.setAttribute('data-chat', 'chat' +response.chatId);

  toolbar.appendChild(btnDiv);
  btnDiv.appendChild(join);
  btnDiv.appendChild(chat);
  ride.appendChild(rideDiv);
  rideDiv.appendChild(ridePanel);
  ridePanel.appendChild(heading);
  ridePanel.appendChild(body);
  body.appendChild(info);
  body.appendChild(toolbar);
};

window.addEventListener('DOMContentLoaded', function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/rides');
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send();

  xhr.addEventListener('load', function() {
    var response = JSON.parse(xhr.responseText);
    // console.log(response);
    response.forEach(function(result) {
      if (result.seats >= 0) {
        makeRide(result);
      }
    })
  });
});


//User can create new carpool
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
  rideDetails.seats = parseInt(seats.val());

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/rides/create');
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify(rideDetails));

  resetRide();

  $('#carpool-info').addClass('hidden');

  xhr.addEventListener('load', function() {
    var response = JSON.parse(xhr.response);
    console.log(response.venue);

    makeRide(response);

  });
});

//User can cancel making a ride
cancel.addEventListener('click', function(e) {
  rideInfo.value = '';
  $('#carpool-info').addClass('hidden')
});


//User can join ride
hitch.addEventListener('click', function(e) {
  // var target = e.target.getAttribute('data-id') || e.target.getAttribute('data-chat');


  var sessions = {}

  var join = e.target.getAttribute('data-id');
  var chat = e.target.getAttribute('data-chat');
  e.preventDefault();

  if (join) {
    var param = join.slice(4, 17);
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', '/rides/' + param);
    xhr.send()

    xhr.addEventListener('load', function() {
      var response = JSON.parse(xhr.response);
      clear(hitch)
      response.forEach(function(result) {
        if (result.seats >= 0){
          makeRide(result)
        }
      })
    });
  } else if (chat) {
    // landing.addClass('hidden');
    // var param = chat.slice(4, 17);
    // console.log(param)
    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', 'rides/chat/' + param);
    // xhr.send()

    function makeChat() {
      var div = document.createElement('div');
      div.className = 'col-md-6';
      var panel = document.createElement('div');
      div.className = 'panel panel-default';
      var messageArea = document.createElement('div');
      messageArea.className = 'panel-body';



    }
  }
});

function clear(area) {
  while(area.firstChild) {
    area.removeChild(area.firstChild)
  }
};

var socket = io();
$('#test-form').submit(function() {
  socket.emit('chat message', $('#chat-input').val());
  $('#chat-input').val('');
  return false;
});
