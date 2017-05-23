'use strict';

import mongoose from 'mongoose';

var MoviesmappingendpointSchema = new mongoose.Schema({
  MovieName: String,
  TheatreName: String,
  City: String,
  MovieDates:[{type:String}],
  ShowTimings:Array
});

export default mongoose.model('Moviesmapping', MoviesmappingendpointSchema);
