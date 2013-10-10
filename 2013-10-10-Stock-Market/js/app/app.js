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
  Δdb = new Firebase('https://stock-market-kjm.firebaseio.com/');
  $('#setbutton').click(setFunds);
  $('#buybutton').click(purchase);


  Δbalance = Δdb.child('balance');
  Δstocks = Δdb.child('stocks');
  Δquotes = Δdb.child('quotes');
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

    if()

    $('#symbol').val('');
    $('#quantity').val('');

  });

}

  function requestQuote(symbol, fn){
    var data = {symbol: symbol};
    $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', data, fn);
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
