var mongoose = require('mongoose');

var ParkingSpot = mongoose.Schema({
  lat:                  Number,
  lng:                  Number,
  initialComment:       String,
  creator:              String,
  upvote:               Number,
  downvote:             Number,
  additionalComments:   String,
  additionalUsers:      String,
  createdAt:  {type: Date, default: Date.now}
});

mongoose.model('ParkingSpot', ParkingSpot);
