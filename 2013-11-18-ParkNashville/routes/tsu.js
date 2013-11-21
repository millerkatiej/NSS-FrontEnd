/*
* GET /tsu
*/

exports.index = function(req, res){
  res.render('tsu/index', {title: 'TSU'});
};