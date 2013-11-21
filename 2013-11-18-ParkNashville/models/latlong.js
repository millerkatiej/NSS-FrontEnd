var mongoose = require('mongoose');

var LatLng = mongoose.Schema({
  lat:       String,
  long:      String,
  createdAt:  {type: Date, default: Date.now}
});

mongoose.model('LatLng', LatLng);