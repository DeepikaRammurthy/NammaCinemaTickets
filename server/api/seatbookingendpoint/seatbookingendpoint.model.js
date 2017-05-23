'use strict';

import mongoose from 'mongoose';

var SeatbookingendpointSchema = new mongoose.Schema({
  MovieName: String,
  TheatreName: String,
  PlaceName:String,
  CityName:String,
  Date: String,
  ShowTime:String,
  GoldClassSeats:Array,
  SilverClassSeats:Array

});

export default mongoose.model('Seatbooking', SeatbookingendpointSchema);
