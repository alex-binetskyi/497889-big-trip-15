import {createElement} from '../utils.js';

export const createTripEventsListEmptyTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class TripFilters {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripEventsListEmptyTemplate();
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
