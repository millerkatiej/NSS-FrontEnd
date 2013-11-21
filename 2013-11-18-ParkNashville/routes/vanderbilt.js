/*
* GET /vanderbilt
*/

exports.index = function(req, res){
  res.render('vanderbilt/index', {title: 'Vanderbilt'});
};