$(document).ready(initialize);

function change_div_text() {
  var name = $('#name').val();
  var color = $('#color').val();
  $('#b').text(name).css('background-color', color);
}
function age_verification() {
  var age = $('#age').val();
  age = parseInt(age);

  if(age < 21) {
  $('#age_div').text('Not Allowed!').css('background-color', 'red');
  }
  else {
    $('#age_div').text('Welcome!').css('background-color', 'green');
  }
}

function initialize() {

  $('#clicker').click(change_div_text);
  $('#age_check').click(age_verification)




  // $('div').css('background-color', 'red');
  // $('div').css('font-size', '25px');
  // $('div').css('color', 'yellow');

  // var color = prompt('What color?');
  // $('div').css('background-color', color);
  // var size = prompt('What size?');
  // $('div').css('font-size', size);

  // var selector = prompt('Which div?');
  // var cls = prompt('Class to add?');
  // var new_text = prompt('What would you like to say?');
  // $(selector).addClass(cls);
  // $(selector).text(new_text);

  // var selector_to_hide = prompt('Which node would you like to hide?');
  // $(selector_to_hide).hide();


}

