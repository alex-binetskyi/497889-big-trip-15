import AbstractView from './abstract.js';

const createTripCostTemplate = (price) => (
  `<p class="trip-info__cost">
    Total: €&nbsp;<span class="trip-info__cost-value">${price}</span>
  </p>`
);

export default class TripCost extends AbstractView {
  constructor(price) {
    super();
    this._price = price;
  }

  getTemplate() {
    return createTripCostTemplate(this._price);
  }
}
