var mongoose = require('mongoose');
var ParkingSpot = mongoose.model('ParkingSpot');
var Comment = mongoose.model('Comment');
var moment = require('moment');

exports.create = function(req, res){
  new ParkingSpot(req.body).save(function(err, ps){
    res.send(ps);
  });
};

exports.marker = function(req, res){

  ParkingSpot.find(function(err, spots){
    res.send(spots);
  });

};

exports.new = function(req, res){
  ParkingSpot.findById(req.params.id).populate('comments').exec(function(err, ps){
    res.render('parking/new', {title: 'Parking', ps:ps, moment:moment});
  });
};

exports.comments = function(req,res){
  console.log(req.body);
  new Comment(req.body).save(function(err, comment){
    ParkingSpot.findById(req.body.parkingSpotId, function(err, parkingSpot){
      parkingSpot.comments.push(comment.id);
      parkingSpot.save(function(err,result){
        res.send(comment);
      });
    });
  });


};

// exports.comment = function(req, res){
//   Comment.
// }
// exports.create = function(req, res){
//   new Comment(req.body).save(function(err, comment){
//     Comment.findById(comment.id).populate('priority').exec(function(err, todo){
//       res.send(todo);
//     });
//   });
// };

