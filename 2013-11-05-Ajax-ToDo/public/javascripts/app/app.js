$(document).ready(initialize);

function initialize(){
  $(document).foundation();

  $('form#priority').on('submit', submitPriority);
  $('form#todo').on('submit', submitTodo);
  $('#todobody > td.delete').on('click, clickDelete');
}

function submitAjaxForm(event, form, successFn){
  var url = $(form).attr('action');
  var data = $(form).serialize();

  var options = {};     // building an AJAX request//
  options.url = url;
  options.type = 'POST';
  options.data = data;
  options.success = successFn;
  options.error = function(jqXHR, status, error){console.log(error);};

  $.ajax(options);
  event.preventDefault();
}

function clickDelete(){

}
function submitPriority(event){
  submitAjaxForm(event, this, function(data, status, jqXHR){
    htmlAddPriorityToSelect(data);
  });
}

function submitTodo(event){
 submitAjaxForm(event, this, function(data, status, jqXHR){
    console.log(data);
    htmlAddTodo(data);
  });
}

function htmlAddPriorityToSelect(priority){
  var $option = $('<option>');
  $option.val(priority._id);
  $option.text(priority.name);
  $('select#priority-select').append($option);
  $('form#priority input').val('');
  $('form#priority input[name="name"]').focus();
}

function htmlAddTodo(todo){
  var tr = '<tr><td>' + todo.title + '</td><td>' + todo.dueDate + '</td><td>' + todo.priority.name + '</td><td class="delete"><input type="button" class="button small alert radius" value="Delete"></td>';
  var $tr = $(tr);
  $('#todobody').append($tr);
}

