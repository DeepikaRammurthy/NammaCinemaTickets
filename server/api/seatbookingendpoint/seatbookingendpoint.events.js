/**
 * Seatbookingendpoint model events
 */

'use strict';

import {EventEmitter} from 'events';
import Seatbookingendpoint from './seatbookingendpoint.model';
var SeatbookingendpointEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SeatbookingendpointEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Seatbookingendpoint.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SeatbookingendpointEvents.emit(event + ':' + doc._id, doc);
    SeatbookingendpointEvents.emit(event, doc);
  }
}

export default SeatbookingendpointEvents;
