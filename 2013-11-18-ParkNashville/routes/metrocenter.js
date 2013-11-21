/*
* GET /metrocenter
*/

exports.index = function(req, res){
  res.render('metrocenter/index', {title: 'Metrocenter'});
};