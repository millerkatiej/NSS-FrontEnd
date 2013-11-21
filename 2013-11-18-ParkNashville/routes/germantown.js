/*
* GET /germantown
*/

exports.index = function(req, res){
  res.render('germantown/index', {title: 'Germantown'});
};