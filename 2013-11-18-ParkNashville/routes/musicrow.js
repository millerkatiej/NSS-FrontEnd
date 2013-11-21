/*
* GET /musicrow
*/

exports.index = function(req, res){
  res.render('musicrow/index', {title: 'Music Row'});
};