'use strict';

import mongoose from 'mongoose';

var MoviesendpointSchema = new mongoose.Schema({
  Poster:String,
  Name: String,
  Year: Number,
  Genre: String,
  MovieReviews:[{}],
  AvgRatings:[]
});

export default mongoose.model('Movie', MoviesendpointSchema);
