/*
* GET /nations
*/

exports.index = function(req, res){
  res.render('nations/index', {title: 'The Nations'});
};