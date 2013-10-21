'use strict';

// Firebase Schema
var Δdb;
var Δpositions;

// Local Schema (defined in keys.js)
$(document).ready(initialize);
db.positions = [];
db.path = [];


function initialize(){
  $(document).foundation();
  Δdb = new Firebase(db.keys.firebase);
  Δpositions = Δdb.child('positions');
  Δpositions.on('child_added', dbPositionAdded);
  initMap(36, -86, 5);
  $('#startbutton').click(clickStart);
  $('#erasebutton').click(clickErase);
  $('#stopbutton').click(clickStop);
  Δpositions.remove();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickStart() {

  var geoOptions = {enableHighAccuracy: true, maximumAge: 1000, timeout: 60000};
  db.watchId = navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);
}

function clickStop() {
  navigator.geolcation.clearWatch(db.watchId);
}

function clickErase() {
  Δpositions.remove();
  db.positions = [];
  db.path = [];
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function dbPositionAdded(snapshot) {
  var position = snapshot.val();

  var latLng = new google.maps.LatLng(position.latitude, position.longitude); //finds your lat/long and sets it as a variable called latLng

  db.positions.push(position);

  if(db.positions.length === 1) {
    htmlAddStartIcon(latLng);
    htmlInitializePolyLine();
  }

    db.path.push(latLng);
    setCenterZoom(latLng);

  $('#debug').text(position.time);



}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //


function htmlAddStartIcon(latLng) {
  var image = '/img/cake.png';
  db.marker = new google.maps.Marker({map: db.map, position: latLng, icon: image}); //uses variable latLng to put a marker on where you are
}

function htmlInitializePolyLine() {
  var polyLine = new google.maps.Polyline({
    map: db.map,
    geodesic: true,
    strokeColor: '#FFCCCC',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
  db.path = polyLine.getPath();

}



// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.SATELLITE};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function geoSuccess(location) {
  var position = {};
  position.latitude = location.coords.latitude;
  position.longitude = location.coords.longitude;
  position.altitude = location.coords.altitude || 0;
  position.time = moment().format('MMMM Do YYYY, h:mm:ss a');
  Δpositions.push(position);
}

function geoError() {
  console.log('Sorry, no position available.');
}



// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function setCenterZoom(latLng){
  db.map.setCenter(latLng);
  db.marker.setPosition(latLng);
  db.map.setZoom(19);
}

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

function parseUpperCase(string){
  return string.toUpperCase();
}

function parseLowerCase(string){
  return string.toLowerCase();
}

function formatCurrency(number){
  return '$' + number.toFixed(2);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
