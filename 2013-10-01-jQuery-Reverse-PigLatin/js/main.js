$(document).ready(initialize)

function pig_latin(string) {
  return string.slice(1) +string[0] + 'ay';
}

function split_string(string) {
  return string.split(" ");
}

function reverse_array(array) {
  return array.reverse();
}



function initialize() {
  $('#convert').click(run_program);
}

function run_program() {
  var input = $('#original').val();
  var split_list = split_string(input);
  var list = [];
  for (var i =  0; i < split_list.length; i++) {
    var piglatin = pig_latin(split_list[i]);
    list.push(piglatin);
  }

  var reverse_list = reverse_array(list);
  var final_list = reverse_list.join('; ')
  $('#converted').val(final_list);

}
