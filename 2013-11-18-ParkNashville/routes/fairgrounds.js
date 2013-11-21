/*
* GET /fairgrounds
*/

exports.index = function(req, res){
  res.render('fairgrounds/index', {title: 'TN State Fairgrounds'});
};