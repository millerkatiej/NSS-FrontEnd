var mongoose = require('mongoose');

var Comment = mongoose.Schema({
  parkingSpotId:          String,
  userName:               String,
  comment:                String,
  hours:                  String,
  parkingAttendant:       {type: String},
  createdAt:              {type: Date, default: Date.now}
});

mongoose.model('Comment', Comment);