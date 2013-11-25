var mongoose = require('mongoose');
var moment = req
var Comment = mongoose.Schema({
  parkingSpotId:          String,
  userName:               String,
  comment:                String,
  hours:                  String,
  parkingAttendant:       {type: Boolean},
  createdAt:              moment({type: Date, default: Date.now}).format(MMMM Do YYYY, h:mm a)
});

mongoose.model('Comment', Comment);