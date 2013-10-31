var fs = require('fs');

/*
 * GET colors page.
 */

exports.index = function(req, res){
  var data = fs.readFileSync('colors.json');
  var colors = JSON.parse(data);
  res.render('colors/index', {title: 'Colors Page', colors: colors});
};

exports.new = function(req, res){
  res.render('colors/new', {title: 'Submit a Color'});
};


exports.create = function(req, res){//-this gets called when the user clicks 'Save color'
  var color = req.body.color;
  var data = fs.readFileSync('colors.json');
  var colors = JSON.parse(data); //- JSON.parse() will take any string and turn it into a JS object

  colors.push(color);

  fs.writeFileSync('colors.json', JSON.stringify(colors));
  res.redirect('/colors');
};
