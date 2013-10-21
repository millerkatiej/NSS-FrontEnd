'use strict';

module('name-of-section-for-grouping', {setup: setupTest, teardown: teardownTest});
//modules are a way to group your code

function setupTest(){
  initialize(null, true);
}
//setupTest is for anything that needs to run BEFORE your code begins

function teardownTest(){
}
// teardownTest is for anything that needs to run AFTER your code finishes



// asyncTest('Calculate 2 numbers', function(){
//   expect(4); //how many assertions will be in your test?
//   $('#op1').val('3');
//   $('#op2').val('2');
//   $('#operator').val('*');


//   $('#result').on('DOMChanged', function(){
//     deepEqual($('#op1').val(), '','op1 should be blank'); //in deepEqual, there are three elements in the (), what there is, what you expected, and a string of what you expected
//     deepEqual($('#op2').val(), '','op2 should be blank');
//     deepEqual($('#operator').val(), '','operator should be blank');
//     deepEqual($('#result').text(), '6', 'result should be 6');
//     start();
//   });

//   $('#calculate').trigger('click');
// });
//you use asyncTest when there are events involved

test('Paper Trail', function(){
  expect(8); //how many assertions will be in your test?
  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  deepEqual($('#history > li').length, 1, 'should be 1 LIs');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#calculate').trigger('click');


  deepEqual($('#history > li').length, 2, 'should be 2 LIs');

  deepEqual($('#history > li:first-child > span').length, 5, 'should be 5 spans');
  ok($('#history > li:first-child > span:first-child').hasClass('op1'), true, 'should be true that has class op1');
  ok($('#history > li:first-child > span:nth-child(2)').hasClass('operator'), true, 'should be true that has class operator');
  ok($('#history > li:first-child > span:nth-child(3)').hasClass('op2'), true, 'should be true that has class op2');
  ok($('#history > li:first-child > span:nth-child(5)').hasClass('result'), true, 'should be true that has class result');
  deepEqual($('#history > li:first-child').text(), '7*8=56', 'should be 7 times 8 equals 56 typed out');



});


