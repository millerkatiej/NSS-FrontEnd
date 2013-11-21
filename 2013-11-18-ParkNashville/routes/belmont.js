/*
* GET /belmont
*/

exports.index = function(req, res){
  res.render('belmont/index', {title: 'Belmont'});
};