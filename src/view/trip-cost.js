import {createElement} from '../utils.js';

const createTripCostTemplate = (price) => (
  `<p class="trip-info__cost">
    Total: €&nbsp;<span class="trip-info__cost-value">${price}</span>
  </p>`
);

export default class TripCost {
  constructor(price) {
    this._element = null;
    this._price = price;
  }

  getTemplate() {
    return createTripCostTemplate(this._price);
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
