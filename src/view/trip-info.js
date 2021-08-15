import {createElement} from '../utils';
import { renderTripPath } from './view-utils';

const createTripInfoTemplate = (towns, dateFrom, dateTo) => (
  `<div class="trip-info__main">
    <h1 class="trip-info__title">${renderTripPath(towns)}</h1>  
    <p class="trip-info__dates">${dateFrom.format('MMM D')} — ${dateTo.format('MMM D')}</p>
    </div>`
);

export default class TripInfo {
  constructor(towns, dateFrom, dateTo) {
    this._element = null;
    this._towns = towns;
    this._dateFrom = dateFrom;
    this._dateTo = dateTo;
  }

  getTemplate() {
    return createTripInfoTemplate(this._towns, this._dateFrom, this._dateTo);
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
