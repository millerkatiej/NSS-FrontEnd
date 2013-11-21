/*
* GET /fivepoints
*/

exports.index = function(req, res){
  res.render('fivepoints/index', {title: '5 Points'});
};