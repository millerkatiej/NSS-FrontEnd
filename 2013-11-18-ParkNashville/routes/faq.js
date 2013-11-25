/*
* GET /faq
*/

exports.index = function(req, res){
  res.render('faq/index', {title: 'Frequently Asked Questions'});
};