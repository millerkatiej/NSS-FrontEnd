'use strict';

var photos = [];
var currentIndex = 0;
var timer = 0;
var page = 1;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#search').click(searchFlickr);
}

function searchFlickr() {
  var API_KEY = 'dbe03c53252c91f4af571732be3bcef7';
  var PER_PAGE = 5;
  var query = $('#query').val();
  var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&text=' + query + '&per_page=' + PER_PAGE + '&page=' + page + '&format=json&jsoncallback=?';
  $.getJSON(url, results);

  console.log(url);
}

function results(data) {
  photos = data.photos.photo;
  timer = setInterval(createImage, 1000);
}


function createImage() {
  var photo = photos[currentIndex];

  try {
  var url = "url(http://farm"+ photo.farm +".static.flickr.com/"+ photo.server +"/"+ photo.id +"_"+ photo.secret +"_m.jpg)";
  var $div = $('<div>');
  $div.addClass('photo');
  $div.css('background-image', url);
  $('#photos').prepend($div);

  if(currentIndex < photos.length - 1) {
    currentIndex++;
  } else {
    clearInterval(timer);
    currentIndex = 0;
    page++;
    searchFlickr();
  }
}
catch (err) {
  clearInterval(timer);
  currentIndex = 0;
  searchFlickr();
}
}

