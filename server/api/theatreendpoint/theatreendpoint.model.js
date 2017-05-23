'use strict';

import mongoose from 'mongoose';

var TheatreendpointSchema = new mongoose.Schema({
  TheatreName: String,
  PlaceName:String,
  City: String,
  ShowTimes:Array,
  GoldClassSeats:{FirstRow:String,LastRow:String,NumberOfSeats:Number},
  SilverClassSeats:{FirstRow:String,LastRow:String,NumberOfSeats:Number},
});

export default mongoose.model('Theatres', TheatreendpointSchema);
