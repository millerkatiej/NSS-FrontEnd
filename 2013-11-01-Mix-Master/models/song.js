var mongoose = require('mongoose');

var Song = mongoose.Schema({
  title:    {type: String,
            required: [true, 'Song name is required'],
            match: [ /^[a-zA-Z0-9\'\(\)]+[a-zA-Z0-9-\'\(\) ]*$/, '{VALUE} is an invalid name'] },
  duration: {type: Number, min: 1},
  genres:   [{type: mongoose.Schema.Types.ObjectId, ref: 'Genre'}],
  art:      {type: String,
            required: [true, 'File must be .png, .jpg, .jpeg'],
            match: [/^[a-zA-Z][a-zA-Z-]*\.(jpg|jpeg|png)$/, '{VALUE} is an invalid file type']},
  filename: {type: String,
            required: [true, 'File must be .png, .jpg, .jpeg'],
            match: [/^[a-zA-Z][a-zA-Z-]*\.mp3$/, '{VALUE} is an invalid file type']},
  lyrics:   String,
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('Song', Song);
