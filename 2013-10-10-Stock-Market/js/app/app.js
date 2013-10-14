'use strict';

//Firebase Schema
var Δdb;
var Δbalance;
var Δstocks;
var Δquotes;

//Local Schema
var db = {};
db.balance = 0;
db.stocks = [];
db.quotes = [];

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#setbutton').click(setFunds);
  $('#buybutton').click(purchase);

  Δdb = new Firebase('https://stock-market-kjm.firebaseio.com/');
  Δbalance = Δdb.child('balance');
  Δstocks = Δdb.child('stocks');
  Δbalance.on('value', balanceChange);
}

function balanceChange(snapshot){
  snapshot = snapshot.val();
  db.balance = snapshot;
  console.log('you just got a snapshot from the db');
  console.log(snapshot);
}

function setFunds() {
  var balance = $('#setfunds').val();
  balance = parseFloat(balance);

  Δbalance.set(balance);
}

function purchase() {
  var symbol = $('#symbol').val();
  var quantity = $('#quantity').val();
  quantity = parseInt(quantity);

  requestQuote(symbol, function(data, textStatus, jqXHR){
    var quote = data.Data;
    var info = {};
    info.name = quote.Name;
    info.acronym = quote.Symbol;
    info.price = quote.LastPrice;
    info.currentprice = quote.LastPrice;
    info.amount = quantity;
    info.total = (quantity * info.price);



    Δstocks.push(info);
    createRow(info);

    $('#symbol').val('');
    $('#quantity').val('');

  });

}

  function requestQuote(symbol, fn){
    var data = {symbol: symbol};
    $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', data, fn);
}

function createRow(info){
  var row = '<tr><td class="name"></td><td class="acronym"></td><td class="purchasePrice"></td><td class="currentValue"></td><td class="amountPurchased"></td><td class="total"></td></tr>';
  var $row = $(row);
  $row.children('.name').text(info.name);
  $row.children('.acronym').text(info.acronym);
  $row.children('.purchasePrice').text('$' + info.price);
  $row.children('.currentValue').text('$' + info.currentprice);
  $row.children('.amountPurchased').text(info.amount);
  $row.children('.total').text('$' + info.total);

  $('#items').append($row);
  $('#balance').text((db.balance - info.total));
  var newbalance = parseFloat(db.balance - info.total);
  Δbalance.push(newbalance);


}



// function buyStock() {
//   var symbol = $('#symbol').val();
//   var quantity = $('#quantity').val();
//   quantity = parseInt(quantity);
//   var stock = {};
//   stock.symbol = symbol;
//   stock.quantity = quantity;
//   Δstocks.push(stock);
//   getStockQuote();
// }

// function getStockQuote(fn){
//   var data = {};
//   var symbol = $('#symbol').val();
//   data.symbol = symbol;
//   $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', data, fn);

// }
