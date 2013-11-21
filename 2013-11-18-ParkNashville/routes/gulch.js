/*
* GET /gulch
*/

exports.index = function(req, res){
  res.render('gulch/index', {title: 'The Gulch'});
};