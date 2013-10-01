$(document).ready(initialize);


function initialize() {
  $("#button1").click(change_green);
  $('#name_btn').click(count);

}

function change_green() {
  $('#green').css({'background-color': 'green', 'color': 'red'});
}


function count() {
  debugger;
  var name = $('#name_txt').val();
  name = name.length;

  $('#name_div').text(name);


}