import TripEventView from './trip-event';
import { MOCK_EVENTS } from '../mock/events';
import {createFormCreateEventTemplate} from './form-create-event.js';
import {createElement} from '../utils.js';

let events = '';
for(let i = 0; i < MOCK_EVENTS.length; i++) {
  let eventItem;
  if(i === 0) {
    eventItem = createFormCreateEventTemplate(MOCK_EVENTS[i]);
  } else {
    // console.log(MOCK_EVENTS[i]);
    eventItem = new TripEventView((MOCK_EVENTS[i])).getTemplate();
  }
  events += eventItem;
}

const createTripEventListTemplate = () => (
  `<ul class="trip-events__list">
    ${events}
  </ul>`
);

export default class TripEventList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripEventListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
