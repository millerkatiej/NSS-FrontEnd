/*
* GET /sylvanpark
*/

exports.index = function(req, res){
  res.render('sylvanpark/index', {title: 'Sylvan Park'});
};