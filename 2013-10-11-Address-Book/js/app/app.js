'use strict';

var Δdb;
var Δpeople

var db = {};
db.people = [];

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#add').click(addPerson)
  Δdb = new Firebase('https://address-book-kjm.firebaseio.com');
  Δpeople = Δdb.child('people');
  Δpeople.on('value', addContact)
}

function addContact(snapshot) {
  db.people = snapshot.val();
  var people = db.people;
  console.log(people);
  var person = people.firstchild;
  console.log(person);

}

function addPerson() {
  var person = {};
  person.name = $('#name').val();
  person.address = $('#address').val();
  person.website = $('#website').val();
  person.email = $('#email').val();
  person.photo = $('#photo').val();

  Δpeople.push(person);
}
