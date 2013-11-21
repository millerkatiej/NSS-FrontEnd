/*
* GET /eighthsouth
*/

exports.index = function(req, res){
  res.render('eighthsouth/index', {title: '8th South'});
};