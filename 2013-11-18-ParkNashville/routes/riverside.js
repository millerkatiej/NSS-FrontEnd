/*
* GET /riverside
*/

exports.index = function(req, res){
  res.render('riverside/index', {title: '5 Points'});
};