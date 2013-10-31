
/*
 * GET home page.
 */

 var math = require('../modules/math.js'); //require fetches information that has been exported by the file you target

exports.index = function(req, res){
  res.render('index', { title: 'Express', square: math.square(3), area: math.area(3, 4), volume: math.vol(3, 3, 3) }); //you pass data into view by defining the object
};