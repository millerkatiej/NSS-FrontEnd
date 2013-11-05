var mongoose = require('mongoose');
var Song = mongoose.model('Song');
var Artist = mongoose.model('Artist');

/*
 * GET /artists
 */

exports.index = function(req, res){
  res.render('artists/index', {title: 'Artists'});
};

/*
 * GET /artists/new
 */

exports.new = function(req, res){
  Song.find(function(err, songs){
    res.render('artists/new', {title: 'New Artist', songs: songs});
  });
};

/*
 * POST /artists
 */

exports.create = function(req, res){
  new Artist(req.body).save(function(err, artist, count){

    res.redirect('/artists');
  });

};

