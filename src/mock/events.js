import { getRandomInteger } from '../utils/common';
import { getRandomDate, addDayGap } from '../utils/event';
import { TYPES } from '../const';
import { generateEventOffers } from './event-offers';
import { generateEventDestination } from './event-destination';

const EVENT_COUNT = 15;
const MOCK_EVENTS = [];

for(let i = 0; i < EVENT_COUNT; i++) {
  const event = {};
  if(i > 0) {
    const previousDate = MOCK_EVENTS[i - 1]['dateTo'];
    event['dateFrom'] = previousDate;
  } else {
    event['dateFrom'] = getRandomDate();
  }
  event['basePrice'] = getRandomInteger(3, 20) * 100;
  event['dateTo'] =  addDayGap(event['dateFrom']);
  event['destination'] = generateEventDestination();
  event['id'] = i + 1;
  event.isFavorite = Boolean(getRandomInteger(0, 1));
  const type = TYPES[getRandomInteger(0, TYPES.length - 1)];
  event['offers'] = generateEventOffers(type);
  event['type'] = type;
  MOCK_EVENTS.push(event);
}

export { MOCK_EVENTS };
