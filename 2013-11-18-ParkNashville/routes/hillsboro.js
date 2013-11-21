/*
* GET /hillsboro
*/

exports.index = function(req, res){
  res.render('hillsboro/index', {title: 'Hillsboro Village'});
};