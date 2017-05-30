'use strict';

import mongoose from 'mongoose';

var MoviesmappingendpointSchema = new mongoose.Schema({
  MovieName: String,
  TheatreName: String,
  PlaceName:String,
  City: String,
  Year:Number,
  Poster:String,
  Genre:String,
  MovieDates:[{type:String}],
  ShowTimings:Array
});

export default mongoose.model('Moviesmapping', MoviesmappingendpointSchema);
