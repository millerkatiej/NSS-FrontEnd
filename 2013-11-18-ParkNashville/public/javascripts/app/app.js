/* global document, window */

$(document).ready(initialize);

var map, position;

function initialize(){
  $(document).foundation();
  switch(window.location.pathname){
    case '/':
      initMap(36.166667, -86.783333, 12);
      break;
    case '/germantown':
      initMap(36.178034,-86.788284, 15);
      break;
    case '/fivepoints':
      initMap(36.177562,-86.749938, 15);
      break;
    case '/eighthsouth':
      initMap(36.131788,-86.778963, 15);
      break;
    case '/twelfthsouth':
      initMap(36.126125,-86.789292, 15);
      break;
    case '/belmont':
      initMap(36.13187,-86.795475, 15);
      break;
    case '/downtown':
      initMap(36.161006,-86.777276, 15);
      break;
    case '/elliston':
      initMap(36.150944,-86.804562, 15);
      break;
    case '/fairgrounds':
      initMap(36.131662,-86.768444, 15);
      break;
    case '/fisk':
      initMap(36.167225,-86.804831, 15);
      break;
    case '/greenhills':
      initMap(36.105826,-86.81399, 15);
      break;
    case '/gulch':
      initMap(36.152495,-86.784225, 15);
      break;
    case '/hillsboro':
      initMap(36.136662,-86.800877, 15);
      break;
    case '/lipscomb':
      initMap(36.105306,-86.800116, 15);
      break;
    case '/metrocenter':
      initMap(36.196079,-86.799595, 15);
      break;
    case '/midtown':
      initMap(36.150333,-86.797262, 15);
      break;
    case '/musicrow':
      initMap(36.152049,-86.791652, 15);
      break;
    case '/nations':
      initMap(36.159655,-86.854768, 15);
      break;
    case '/northnashville':
      initMap(36.180077,-86.81105, 15);
      break;
    case '/riverside':
      initMap(36.204806,-86.724275, 15);
      break;
    case '/sobro':
      initMap(36.152846,-86.774486, 15);
      break;
    case '/sylvanpark':
      initMap(36.143229,-86.844245, 15);
      break;
    case '/tsu':
      initMap(36.166878,-86.829164, 15);
      break;
    case '/vanderbilt':
      initMap(36.144347,-86.802755, 15);
      break;
    default:
      initMap(36.166667, -86.783333, 12);
      break;
  }


  google.maps.event.addListener(map, 'dblclick', createPage);

  $('a#save-parking').on('click', clickSaveParking);
}




function initMap(lat, lng, zoom){
  if(position){
    lat = position.lat;
    lng = position.lng;
    zoom = 16;
  }

  var mapOptions = {
    center: new google.maps.LatLng(lat, lng),
    zoom: zoom,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scaleControl: false,
    zoomControl: false
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  map.set('styles', [ { 'featureType': 'water', 'stylers': [ { 'hue': '#00f6ff' } ] },
    { 'featureType': 'road.highway', 'stylers': [ { 'visibility': 'simplified' } ] },
    { 'featureType': 'administrative.neighborhood', 'stylers': [ { 'visibility': 'on' } ] },
    { 'featureType': 'poi.park', 'stylers': [ { 'visibility': 'on' } ] },
    { 'featureType': 'landscape.man_made', 'stylers': [ { 'visibility': 'off' } ] },
    { 'featureType': 'administrative.province', 'stylers': [ { 'visibility': 'off' } ] },
    // { 'featureType': 'poi.business', 'stylers': [ { 'visibility': 'off' } ] },
    { 'featureType': 'poi.place_of_worship', 'stylers': [ { 'visibility': 'off' } ] },
    { 'featureType': 'poi.medical', 'elementType': 'labels.text', 'stylers': [ { 'visibility': 'off' } ] },
    // { 'featureType': 'poi.park', 'elementType': 'labels', 'stylers': [ { 'visibility': 'off' } ] },
    { 'featureType': 'poi.school', 'elementType': 'labels.text', 'stylers': [ { 'visibility': 'off' } ] },
    { } ]);

  // want to add markers for every marker in the mongodb upon initial load

  addMarkers();
}


function addMarkers(){

  sendAjaxRequest('/parking', null, 'get', null, null, function(response){
    var markers = [];
    var infowindows = [];
    for (var i = 0; i < response.length; i++) {
      var myLatLng = new google.maps.LatLng(response[i].lat, response[i].lng);
      var contentString = '' + response[i]._id + '';
      var marker = new google.maps.Marker({
        position: myLatLng,
      });
      var infowindow = new google.maps.InfoWindow({
        content: ('<a href="/parking/'+contentString+'">View Spot Information')
      });
      infowindows.push(infowindow);
      markers.push(marker);
    }

    for(var m = 0; m < markers.length; m++){
      google.maps.event.addListener(markers[m], 'click', function(innerKey) {
        return function() {
          infowindows[innerKey].open(map, markers[innerKey]);
        };
      }(m));
      google.maps.event.addListener(markers[m], 'dblclick', function(innerKey) {
        return function() {
          infowindows[innerKey].close(map, markers[innerKey]);
        };
      }(m));
      markers[m].setMap(map);
    }
  });
}

function createPage(loc){

  var isOk = confirm('Do you want to create this spot?');
  if(isOk){
    var data  = {lat: loc.latLng.lat(), lng: loc.latLng.lng()};
    sendAjaxRequest('/parking', data, 'post', null, null, function(response){
      window.location.href = '/parking/' + response._id;
    });
  }
}

function clickSaveParking(e){
  var data = {};
  data.userName = $('form#createSpot input[name="userName"]').val();
  data.comment = $('form#createSpot input[name="comment"]').val();
  data.hours = $('form#createSpot input[name="hours"]').val();
  data.parkingAttendant = $('form#createSpot input[name="parkingAttendant"]:checked').val();
  data.parkingSpotId = $('form#createSpot input[name="parkingSpotId"]').val();


  sendAjaxRequest('/comments', data, 'post', null, e, function(response){
    var commentDate = moment(response.createdAt).format('MMMM Do YYYY, h:mm a');
    $('#commentData').append('<div class="row"><div class="small-1 columns"><p>'+response.userName+'</p></div><div class="small-5 columns"><p>'+response.comment+'</p></div><div class="small-2 columns"><p>'+response.hours+'</p></div><div class="small-2 columns"><p>'+response.parkingAttendant+'</p></div><div class="small-2 columns"><p>'+commentDate+'</p></div></div>');
    $('form#createSpot')[0].reset();

  });

}
