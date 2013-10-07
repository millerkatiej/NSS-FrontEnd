$(document).ready(initialize);

function initialize() {
  $('#addcolor').click(addboxes);
  $('#color').focus(clearinput);
}

function addboxes() {
  var colorboxinput = $('#color').val();
  var $colorbox = $('<div>');
  $colorbox.addClass('box');
  $colorbox.css('background-color', colorboxinput);
  $('#brush.box').prepend($colorbox);
  $('#color').focus();

}

function clearinput() {
  $('#color').val('');
}