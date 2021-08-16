import AbstractView from './abstract.js';

export const createTripEventsListEmptyTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class TripFilters extends AbstractView {
  getTemplate() {
    return createTripEventsListEmptyTemplate();
  }
}
