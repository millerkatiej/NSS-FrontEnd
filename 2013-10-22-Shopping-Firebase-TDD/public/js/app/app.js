'use strict';

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

// Firebase Schema
var Δdb;
var Δproducts;
var Δcustomers;
var Δorders;

// Local Schema (defined in keys.js)
db.products = [];
db.customers = [];
db.orders = [];

db.cart = {};
db.cart.products = [];
db.cart.totals = {};

db.pagination = {};
db.pagination.perPage = 5;
db.pagination.currentPage = 1;
db.pagination.currentRowCount = 0;

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  initializeDatabase();
  turnHandlersOn();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function initializeDatabase(){
  Δdb = new Firebase(db.keys.firebase);
  Δproducts = Δdb.child('products');
  Δcustomers = Δdb.child('customers');
  Δorders = Δdb.child('orders');

  Δproducts.on('child_added', dbProductAdded);
  Δcustomers.on('child_added', dbCustomerAdded);
  Δorders.on('child_added', dbOrderAdded);
}

function turnHandlersOn(){
  $('#add-product').on('click', clickAddProduct);
  $('#add-customer').on('click', clickAddCustomer);
  $('#previous').on('click', clickNavigation);
  $('#next').on('click', clickNavigation);
  $('#select-customer').on('change', changeCustomer);
  $('#products').on('click', '.product-image img', clickProductImage);
}

function turnHandlersOff(){
  $('#add-product').off('click');
  $('#add-customer').off('click');
  $('#previous').off('click');
  $('#next').off('click');
  $('#select-customer').off('change');
  $('#products').off('click', '.product-image img', clickProductImage);

}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function changeCustomer(){
  var name = this.value;
  var customer = _.find(db.customers, function(c){return c.name === name;});
  db.cart.customer = customer;
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickAddProduct(){
  var image = getValue('#product-image');
  var name = getValue('#product-name');
  var weight = getValue('#product-weight', parseFloat);
  var price = getValue('#product-price', parseFloat);
  var off = getValue('#product-off', parseFloat) / 100;

  var product = new Product(image, name, weight, price, off);
  delete product.salePrice;
  Δproducts.push(product);
}

function clickAddCustomer(){
  var image = getValue('#customer-image');
  var name = getValue('#customer-name');
  var isDomestic = $('input[name="address"]:checked').val() === 'domestic';
  htmlResetRadioButtons();

  var customer = new Customer(image, name, isDomestic);
  Δcustomers.push(customer);
}
function clickNavigation(){ //happens when you click either #previous or #next
    db.pagination.currentRowCount = 0; //set to 0 because all of the rows are removed below
    htmlEmptyProductRows(); //removed rows with a class of 'product'


    var isPrevious = this.id === 'previous'; //you can tell the next and previous apart by their ids which were set in the haml
    db.pagination.currentPage += isPrevious ? -1 : +1; //if you just clicked on the previous (? means 'did i click on previous?' -- is a ternary operator), then subtract one, if you did not, add 1


    var startIndex = db.pagination.perPage * (db.pagination.currentPage - 1);
    var endLength = (startIndex + db.pagination.perPage) > db.products.length ? db.products.length : startIndex + db.pagination.perPage;
    //endLength is legth of array on the last page because the startIndex+perPage is longer than the length of the array. The very last page can end in the length of the array because it is the exact number of elements in the array.
    var isLess = startIndex > 0; //if you are on the very first page, your startIndex would be 0, therefore this is not the first page
    var isMore = db.products.length > endLength; //if the length of the array is longer than the endLength than there is still more to show, and you are not on the last page


    htmlShowHideNavigation('#previous', isLess);
    htmlShowHideNavigation('#next', isMore);

    for(var i = startIndex; i < endLength; i++){
      htmlAddProduct(db.products[i]);
    }
}

function clickProductImage(){
  var name = $(this).parent().siblings('.product-name').text();

  var product = _.find(db.products, function(p){
    return p.name === name;
  });

  db.cart.products.push(product);

  console.log('click image...');

  getTotals();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function dbProductAdded(snapshot){
  var obj = snapshot.val();
  var product = new Product(obj.image, obj.name, obj.weight, obj.price, obj.off);
  product.id = snapshot.name();
  db.products.push(product);
  if(db.pagination.currentRowCount < db.pagination.perPage){
    htmlAddProduct(product);
  } else {
    htmlShowHideNavigation('#next', true); //give the function and selector and tell whether it should be shown
  }
}

function dbCustomerAdded(snapshot){
  var obj = snapshot.val();
  var customer = new Customer(obj.image, obj.name, obj.isDomestic);
  customer.id = snapshot.name();
  db.customers.push(customer);
  htmlAddCustomer(customer);
}

function dbOrderAdded(snapshot){
  var obj = snapshot.val();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlAddProduct(product){
  db.pagination.currentRowCount++;
  var tr = '<tr class="product"><td class="product-name">' + product.name + '</td><td class="product-image"><img src="/img/' + product.image + '"></td><td class="product-weight">' + product.weight + ' lbs</td><td class="product-price">' + formatCurrency(product.price) + '</td><td class="product-off">' + product.off + '</td><td class="product-sale">' + formatCurrency(product.salePrice()) + '</td></tr>';
  var $tr = $(tr);
  $('#products').append($tr);
}

function htmlShowHideNavigation(selector, shouldShow){ //shouldShow asks a true or false: should I show the selector?
  $(selector).removeClass('hidden');
    //this removed class hidden from all, only added it back if it needed to be hidden (done below)

  if(!shouldShow){
    $(selector).addClass('hidden');
  }
}

function htmlEmptyProductRows(){
  $('.product').remove();
}

function htmlResetRadioButtons(){
  $('input[name="address"]:checked')[0].checked = false;
}

function htmlAddCustomer(customer){
  var option = '<option>' + customer.name;
  var $option = $(option);

  $('select#select-customer').prepend(option);
}


// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function Product(image, name, weight, price, off){
  this.image = image;
  this.name = name;
  this.weight = weight;
  this.price = price;
  this.off = off;
  this.salePrice = function(){return this.price - (this.price * this.off);};
}

function Customer(image, name, isDomestic){
  this.image = image;
  this.name = name;
  this.isDomestic = isDomestic;
}

// -------------------------------------------------------------------- //
// --------------------------MISC-------------------------------------- //
// -------------------------------------------------------------------- //

function getTotals(){

  var weightSum = 0;

  console.log('weight..');

  for(var i = 0; i < db.cart.products.length; i++){

    weightSum += db.cart.products[i].weight;
  }

  db.cart.totals.weight = weightSum;

}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

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
