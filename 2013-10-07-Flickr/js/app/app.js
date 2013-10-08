'use strict';

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#search').click(searchFlickr);
  $('#save').click(savePhotos);
  $('#clear').click(clearPhotos);
  $('#deleteselected').click(deletePhotos);
  $('#photos').on('click', '.photo', selectedphoto);
  $('#photos').on('dblclick', '.photo', removeImage);
}

function searchFlickr() {
  var API_KEY = 'dbe03c53252c91f4af571732be3bcef7';
  var PER_PAGE = 50;
  var page = 1;
  var query = $('#query').val();
  var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&text=' + query + '&per_page=' + PER_PAGE + '&page=' + page + '&format=json&jsoncallback=?';
  $.getJSON(url, results);


}

function results(data) {
  for (var i = 0; i < data.photos.photo.length; i++) {
    createImage(data.photos.photo[i]);
  }

}

function clearPhotos() {
  $('#photos').empty();
}

function selectedphoto() {
  $(this).toggleClass('selectedphoto');
}

function deletePhotos() {
  $('.selectedphoto').remove();
}

function savePhotos() {
  var $selectedImages = $('.selectedphoto');
  $selectedImages.removeClass('selectedphoto');
  $('#saved-photos').prepend($selectedImages);
}

function createImage(photo) {
  var url = "url(http://farm"+ photo.farm +".static.flickr.com/"+ photo.server +"/"+ photo.id +"_"+ photo.secret +"_m.jpg)";
  var $div = $('<div>');
  $div.addClass('photo');
  $div.css('background-image', url);
  $('#photos').prepend($div);
}

function removeImage() {
  $(this).remove();
}