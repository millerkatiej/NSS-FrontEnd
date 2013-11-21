var mongoose = require('mongoose');
var ParkingSpot = mongoose.model('ParkingSpot');

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

exports.show = function(req, res){
  ParkingSpot.findById(req.params.id, function(err, ps){
    res.render('parking/show', {title: 'Parking', ps:ps});
  });
};
