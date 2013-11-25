var mongoose = require('mongoose');

var ParkingSpot = mongoose.Schema({
  lat:                  Number,
  lng:                  Number,
  contentString:        Number,
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null}],
  createdAt:            {type: Date, default: Date.now}
});

mongoose.model('ParkingSpot', ParkingSpot);
