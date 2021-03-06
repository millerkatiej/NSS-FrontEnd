'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  turnHandlersOff();
  turnHandlersOn();
  db.products = [];
  db.customers = [];
  db.orders = [];
  db.pagination.currentRowCount = 0;
  db.pagination.currentPage = 1;
  db.cart = {};
  db.cart.products = [];
  db.cart.totals = {};
  Δdb.remove();
}

function teardownTest(){
}

test('Add Product', function(){
  expect(12);

  $('#product-image').val('ipad-air.png');
  $('#product-name').val('Ipad Air');
  $('#product-weight').val('1.0');
  $('#product-price').val('500.00');
  $('#product-off').val('10');
  $('#add-product').trigger('click');

  equal(db.products.length, 1, 'products array should have 1 element');
  ok(db.products[0].id, 'id should be populated');
  ok(db.products[0] instanceof Product, 'product should be an instanceof Product');
  equal(db.products[0].image, 'ipad-air.png', 'product should have an image');
  equal(db.products[0].name, 'Ipad Air', 'product should have a name');
  equal(db.products[0].weight, 1.0, 'product should have a weight');
  QUnit.close(db.products[0].salePrice(), 450, 0.01, 'product should have a sale price');

  equal($('#products tr').length, 2, 'should be 2 rows in table');
  equal($('#products tr:nth-child(2) > td').length, 6, 'should be 6 columns in row');
  equal($('#products .product-name').text(), 'Ipad Air', 'name column should be populated');
  equal($('#products .product-sale').text(), '$450.00', 'sale column should be populated');
  equal($('#products .product-image img').attr('src'), '/img/ipad-air.png', 'image column should be populated');
});

test('Product Pagination', function(){
  expect(18);

  for(var i = 0; i < 12; i++){
    var name = Math.random().toString(36).substring(2);
    var image = Math.random().toString(36).substring(2) + '.png';
    var weight = Math.random() * 100;
    var price = Math.random() * 1000;
    var off = Math.random() * 100;

    createTestProduct(name, image, weight, price, off);
  }

  equal(db.products.length, 12, 'should have 12 products');
  equal(db.pagination.perPage, 5, 'should be 5 products per page');
  equal(db.pagination.currentPage, 1, 'should be on first page');
  equal($('#products tr').length, 6, 'should have 5 products in table');
  equal($('#previous.hidden').length, 1, 'previous button should be hidden');
  equal($('#next:not(.hidden)').length, 1, 'next button should not be hidden');

  $('#next').trigger('click');

  equal(db.pagination.currentPage, 2, 'should be on second page');
  equal($('#products tr').length, 6, 'should have 5 products in table');
  equal($('#previous:not(.hidden)').length, 1, 'previous button should not be hidden');
  equal($('#next:not(.hidden)').length, 1, 'next button should not be hidden');

  $('#next').trigger('click');

  equal(db.pagination.currentPage, 3, 'should be on third page');
  equal($('#products tr').length, 3, 'should have 2 products in table');
  equal($('#previous:not(.hidden)').length, 1, 'previous button should not be hidden');
  equal($('#next.hidden').length, 1, 'next button should be hidden');

  $('#previous').trigger('click');
  $('#previous').trigger('click');

  equal(db.pagination.currentPage, 1, 'should be on first page');
  equal($('#products tr').length, 6, 'should have 5 products in table');
  ok($('#previous').hasClass('hidden'), 'previous button should be hidden');
  ok(!$('#next').hasClass('hidden'), 'next button should not be hidden');
});

test('Add Customer', function(){
  expect(7);

  $('#customer-image').val('bob.png');
  $('#customer-name').val('Bob Jenkins');
  $('#domestic')[0].checked = true;
  $('#add-customer').trigger('click');

  equal(db.customers.length, 1, 'should have 1 customer in array');
  ok(db.customers[0] instanceof Customer, 'should be an instance of Customer');
  equal(db.customers[0].name, 'Bob Jenkins', 'name should be present');
  equal(db.customers[0].image, 'bob.png', 'image should be present');
  ok(db.customers[0].id, 'id should be present');
  ok(db.customers[0].isDomestic, 'should be domestic');

  ok(!$('#domestic')[0].checked, 'domestic should not be checked');
});

test('Customer DropDown and Shopping Cart', function(){
  expect(7);

 for(var i = 0; i < 5; i++){
    var name = Math.random().toString(36).substring(2);
    var image = Math.random().toString(36).substring(2) + '.png';
    var isDomestic = _.shuffle([true, false])[0];


    createTestCustomer(name, image, isDomestic);
  }

  createTestCustomer('Bob', 'bob.png', true);

  //table headers
  //name, count, amount (total cost), weight (total weight), shipping, total (shipping cost + amount)

  equal(db.customers.length, 6, 'should have 6 customers');
  equal($('select#select-customer option').length, 6, 'should have 5 option tags');
  equal($('select#select-customer option:nth-child(1)').val(), 'Bob', 'Bob value should be on the top of the list');
  equal($('select#select-customer option:nth-child(1)').text(), 'Bob', 'Bob text should be on the top of the list');
  ok($('table#cart').length, 'shoping cart should be visible');
  equal($('table#cart th').length, 6, 'should be 6 columns');
  ok($('#purchase').length, 'purchase button should be visible');
});

test('Add Items to Shopping Cart', function(){
  expect(1);

  createTestProduct('iPad Air', 'ipad-air.png', 1, 500, 10); //salePrice is 450
  createTestProduct('iPhone 5s', 'iphone-5s.png', 0.5, 200, 0); //salePrice is 200
  createTestProduct('Apple TV', 'apple-tv.png', 1.5, 100, 5); //salePrice is 95

  createTestCustomer('Bob', 'bob.png', true);
  createTestCustomer('Sally', 'sally.png', false);

  $('select#select-customer').val('Sally'); //selected Sally from the dropdown
  $('select#select-customer').trigger('change');
  //2 iPhone 5s'
  $('#products tr:nth-child(3) .product-image img').trigger('click'); //start at table (#products), drill down to third row, grap its td and then its image
  $('#products tr:nth-child(3) .product-image img').trigger('click');

  //1 iPad Air
  $('#products tr:nth-child(2) .product-image img').trigger('click');

  //1 apple tv
  $('#products tr:nth-child(4) .product-image img').trigger('click');

  equal(db.cart.customer.name, 'Sally', 'shopping cart should belong to sally');
  ok(db.cart.customer instanceof Customer, 'Sally should be a customer');
  equal(db.cart.products.length, 4, 'Sally should have 4 items in her shopping cart');
  ok(db.cart.products[0] instanceof Product, 'item in products should be a product');
  equal(db.cart.totals.count, 4, 'should have chosen 4 items');
  equal(db.cart.total.amount, 945, 'should be $945');
  equal(db.cart.totals.weight, 3.5, 'weight should be 3.5');
  //domestic $.050 lb and interational $1.50 lb
  equal(db.cart.totals.shipping, 5.25, 'shipping total should be 5.25');
  equal(db.cart.totals.grand, 950.25, 'amount total should be 945');

  equal($('#cart thead tr').length, 1, 'should be 1 header');
  equal($('#cart tbody tr').length, 3, 'should be 3 rows of items in cart');
  equal($('#cart tfoot tr').length, 1, 'should be a footer');

  equal($('#cart tbody tr:nth-child(1) .product-name').text(), 'iPhone 5s', 'should be an iphone 5s');
  equal($('#cart tbody tr:nth-child(1) .product-count').text(), '2', 'should have a count of 2 for the iphone 5s');

  equal($('#cart tfoot tr #cart-count').text(), '4', 'should have 4 items');
  equal($('#cart tfoot tr #cart-amount').text(), '$945.00', 'should have amount of $945');
  equal($('#cart tfoot tr #cart-weight').text(), '3.5 lbs', 'should have weight of 3.5');
  equal($('#cart tfoot tr #cart-shipping').text(), '$5.25', 'should have $5.25 of shipping');
  equal($('#cart tfoot tr #cart-grand').text(), '$950.25', 'should have grand total of $950.25');


});

function createTestProduct(name, image, weight, price, off){
  $('#product-name').val(name);
  $('#product-image').val(image);
  $('#product-weight').val(weight);
  $('#product-price').val(price);
  $('#product-off').val(off);
  $('#add-product').trigger('click');
}

function createTestCustomer(name, image, isDomestic){
  $('#customer-name').val(name);
  $('#customer-image').val(image);

  if(isDomestic) {
    $('#domestic')[0].checked = true;
  } else {
    $('#international')[0].checked = true;
  }

  $('#add-customer').trigger('click');

}
