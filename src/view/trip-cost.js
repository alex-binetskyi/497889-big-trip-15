

import { MOCK_EVENTS } from '../mock/events';

let price = 0;

for(const event of MOCK_EVENTS) {
  price += event['base_price'];
}

const createTripCostTemplate = () => {
  const priceTemplate = `<p class="trip-info__cost">
    Total: €&nbsp;<span class="trip-info__cost-value">${price}</span>
  </p>`;

  return priceTemplate;
};

export { createTripCostTemplate };
