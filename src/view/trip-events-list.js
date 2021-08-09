import { createTripEventTempate } from './trip-event';
import { MOCK_EVENTS } from '../mock/events';
import {createFormCreateEventTemplate} from './form-create-event.js';

let events = '';
for(let i = 0; i < MOCK_EVENTS.length; i++) {
  let eventItem;
  if(i === 0) {
    eventItem = createFormCreateEventTemplate(MOCK_EVENTS[i]);
  } else {
    eventItem = createTripEventTempate(MOCK_EVENTS[i]);
  }
  events += eventItem;
}

const createTripEventListTemplate = () => (`<ul class="trip-events__list">
  ${events}
</ul>`);

export { createTripEventListTemplate };
