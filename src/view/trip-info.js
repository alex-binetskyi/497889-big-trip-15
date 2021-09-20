import AbstractView from './abstract.js';
import { renderTripPath } from './view-utils';
import dayjs from 'dayjs';

const createTripInfoTemplate = (towns, dateFrom, dateTo) => (
  `<div class="trip-info__main">
    <h1 class="trip-info__title">${renderTripPath(towns)}</h1>  
    <p class="trip-info__dates">${dayjs(dateFrom).format('MMM D')} — ${dayjs(dateTo).format('MMM D')}</p>
    </div>`
);

export default class TripInfo extends AbstractView {
  constructor(towns, dateFrom, dateTo) {
    super();
    this._towns = towns;
    this._dateFrom = dateFrom;
    this._dateTo = dateTo;
  }

  getTemplate() {
    return createTripInfoTemplate(this._towns, this._dateFrom, this._dateTo);
  }
}
