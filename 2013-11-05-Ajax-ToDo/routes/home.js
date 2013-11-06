var mongoose = require('mongoose');
var Priority = mongoose.model('Priority');

/*
 * GET /
 */

exports.index = function(req, res){
  res.render('home/index', {title: 'Express'});
};
