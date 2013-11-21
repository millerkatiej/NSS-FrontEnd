/*
* GET /northnashville
*/

exports.index = function(req, res){
  res.render('northnashville/index', {title: 'North Nashville'});
};