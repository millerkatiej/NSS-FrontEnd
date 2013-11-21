/*
* GET /midtown
*/

exports.index = function(req, res){
  res.render('midtown/index', {title: 'Midtown'});
};