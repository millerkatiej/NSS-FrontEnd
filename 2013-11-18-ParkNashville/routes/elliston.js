/*
* GET /elliston
*/

exports.index = function(req, res){
  res.render('elliston/index', {title: 'Elliston Place'});
};