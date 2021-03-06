import AbstractView from './abstract.js';
import {FilterType} from '../const.js';

const emptyListType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first event',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const createTripEventsListEmptyTemplate = (filterType) => {
  const emptyListText = emptyListType[filterType];

  return (
    `<p class="trip-events__msg">
      ${emptyListText}
    </p>`);
};

export default class NoEvent extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createTripEventsListEmptyTemplate(this._data);
  }
}
