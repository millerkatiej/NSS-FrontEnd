/*
* GET /sobro
*/

exports.index = function(req, res){
  res.render('sobro/index', {title: 'SoBro'});
};