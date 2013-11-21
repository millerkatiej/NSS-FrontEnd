/*
* GET /lipscomb
*/

exports.index = function(req, res){
  res.render('lipscomb/index', {title: 'Lipscomb'});
};