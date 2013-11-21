/*
* GET /downtown
*/

exports.index = function(req, res){
  res.render('downtown/index', {title: 'Downtown/Broadway'});
};