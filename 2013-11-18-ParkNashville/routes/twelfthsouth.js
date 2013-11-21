/*
* GET /twelfthsouth
*/

exports.index = function(req, res){
  res.render('twelfthsouth/index', {title: '12th South'});
};