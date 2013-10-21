'use strict';
//sum (underscore reduce), product, remove negatives (use underscore filter method), remove positives

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}

  $(document).foundation();
  $('#calculate').click(clickCalculator);
  $('#history').on('click', '.delete', deleteRow);
}



function deleteRow() {
  var $li = $(this).parent();
  $li.remove();
}
function clickCalculator() {
  console.log('clicking');
  var op1 = parseInt(getValue('#op1'));
  var op2 = parseInt(getValue('#op2'));
  var operator = getValue('#operator');
  var computation = op1+operator+op2;
  var result = eval(computation);
  $('#result').text(result);

  pushToHistory(op1, operator, op2, result);
}



function pushToHistory(op1, operator, op2, result){
  var $li = $('<li>');
  var spans = '<span class="op1">' + op1 + '</span><span class="operator">' + operator + '</span><span class="op2">' + op2 + '</span><span class="equal">=</span><span class="result">' + result + '</span><input class="delete" type="button" value="X">';
  var $spans = $(spans);
  $li.append($spans);
  $('#history').prepend($li);
}

function deleteLi () {

}

function canRun(flag){
  var isQunit = $('#qunit').length > 0;
  var isFlag = flag !== undefined;
  var value = isQunit && isFlag || !isQunit;
  return value;
}
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
