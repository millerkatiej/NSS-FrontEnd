/*
* GET /fisk
*/

exports.index = function(req, res){
  res.render('fisk/index', {title: 'Fisk/Meharry'});
};