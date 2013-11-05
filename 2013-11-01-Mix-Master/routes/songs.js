var mongoose = require('mongoose');
var Song = mongoose.model('Song');
var Genre = mongoose.model('Genre');

/*
 * GET /songs
 */

exports.index = function(req, res){
  Song.find(function(err, songs){
    res.render('songs/index', {title: 'Express', songs: songs});
  });
};

/*
 * GET /songs/new
 */

exports.new = function(req, res){
  Genre.find(function(err, genres){
    res.render('songs/new', {title: 'New Song', genres: genres});
  });
};

/*
 * POST /songs
 */

exports.create = function(req, res){
  new Song(req.body).save(function(songErr, song, count){
    if(songErr){
      Genre.find(function(genreErr, genres){
        res.render('songs/new', {title: 'Song Page', errors: songErr.errors, genres: genres, song: new Song()})
      });
    } else{
      res.redirect('/songs');
    }
  });
};

/*
 * GET /songs/:id
 */

exports.show = function(req, res){
  Song.findById(req.params.id, function(err, song){
    res.render('songs/show', {title: 'Song', song: song});
  });
};


/*
 * DELETE /songs/:id
 */

exports.delete = function(req, res){
  Song.findByIdAndRemove(req.params.id, function (id, options, callback) {
    res.redirect('/songs');
});
};


// /*
//  * GET /genres/:id/edit
//  */

// exports.edit = function(req, res){
//     Song.findById(req.params.id, function(err, song){
//       res.render('song/edit', {title: 'Edit Song', song: song});
//     });
// };
