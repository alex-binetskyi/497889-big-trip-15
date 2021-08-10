import { MOCK_EVENTS } from '../mock/events';
import {createElement} from '../utils.js';

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const price = MOCK_EVENTS.map((event) => event['base_price']).reduce(reducer);

const createTripCostTemplate = () => (
  `<p class="trip-info__cost">
    Total: €&nbsp;<span class="trip-info__cost-value">${price}</span>
  </p>`
);

export default class TripCost {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripCostTemplate();
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
