'use strict';

// Firebase Schema
var Δdb;
var Δpositions;
var Δfavorites;

// Local Schema (defined in keys.js)
db.positions = [];
db.favorites = [];


$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('treasure-hunt-kjm.firebaseio.com');
  Δpositions = Δdb.child('positions');
  Δfavorites = Δdb.child('favorites');

  initMap(36, -86, 5);
  $('#startbutton').click(clickStart);
  $('#stopbutton').click(clickStop);

}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
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
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

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
