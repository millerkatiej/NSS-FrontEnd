/*
* GET /greenhills
*/

exports.index = function(req, res){
  res.render('greenhills/index', {title: 'Greenhills'});
};