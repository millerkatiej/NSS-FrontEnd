'use strict';

var db;
var items;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#add').click(add);
  $('#save').click(save);
  db = new Firebase('https://inventory-kjm.firebaseio.com/');
  items = db.child('items');

  db.on('value', function(snapshot) {
    var inventory = snapshot.val();
    $('#person').val(inventory.fullName);
    $('#address').val(inventory.address);

});
}

function add() {
  var name = $('#name').val();
  var count = $('#count').val();
  var cost = $('#cost').val();
  var room = $('#room').val();
  var condition = $('#condition').val();
  var date = $('#date').val();

  var row = '<tr><td class="name"></td><td class="count"></td><td class="cost"></td><td class="room"></td><td class="condition"></td><td class="date"></td></tr>';
  var $row = $(row);

  $row.children('.name').text(name);
  $row.children('.count').text(count);
  $row.children('.cost').text(cost);
  $row.children('.room').text(room);
  $row.children('.condition').text(condition);
  $row.children('.date').text(date);count

  var item = {};
  item.name = name;
  item.count = count;
  item.cost = cost;
  item.room = room;
  item.condition = condition;
  item.date = date;

  items.push(item);

  $('#items').append($row);
}

function save() {
  var fullName = $('#person').val();
  var address = $('#address').val();
  var inventory = {};
  inventory.fullName = fullName;
  inventory.address = address;
  db.set(inventory); //writes data to the database
}