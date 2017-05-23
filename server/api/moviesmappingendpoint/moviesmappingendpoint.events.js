/**
 * Moviesmappingendpoint model events
 */

'use strict';

import {EventEmitter} from 'events';
import Moviesmappingendpoint from './moviesmappingendpoint.model';
var MoviesmappingendpointEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MoviesmappingendpointEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Moviesmappingendpoint.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MoviesmappingendpointEvents.emit(event + ':' + doc._id, doc);
    MoviesmappingendpointEvents.emit(event, doc);
  }
}

export default MoviesmappingendpointEvents;
