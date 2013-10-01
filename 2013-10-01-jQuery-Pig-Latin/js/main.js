$(document).ready(initialize)

function pig_latin(string) {
  return string.slice(1) +string[0] + 'ay';
}

function initialize() {
  $('#pig').click(compute_pig);
}


function compute_pig() {
  var original = $('#original').val();
  var piglatin = pig_latin(original);
  $('#pig_latin').val(piglatin);
}



