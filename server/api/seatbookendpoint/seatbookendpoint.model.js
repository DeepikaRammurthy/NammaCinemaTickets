'use strict';

import mongoose from 'mongoose';

var SeatbookendpointSchema = new mongoose.Schema({
  MovieName: String,
  TheatreName: String,
  PlaceName:String,
  CityName:String,
  Date: String,
  ShowTime:String,
  GoldClassSeats:Array,
  SilverClassSeats:Array,
  GoldClassPrice:Number,
  SilverClassPrice:Number
});

export default mongoose.model('Seatbookendpoint', SeatbookendpointSchema);
