import AbstractView from './abstract.js';

export const createTripEventsListTemplate = () => (
  '<ul class="trip-events__list"></ul>'
);

export default class TripFilters extends AbstractView {
  getTemplate() {
    return createTripEventsListTemplate();
  }
}
