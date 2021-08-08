import { getRandomInteger } from '../utils';
import { getRandomDate } from '../utils';
import { addDayGap } from '../utils';
import { generateEventOffers } from './event-offers';
import { generateEventDestination } from './event-destination';

const EVENTS_QUANTITY = 15;
const MOCK_EVENTS = [];
const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

for(let i = 0; i <= EVENTS_QUANTITY; i++) {
  const event = {};
  if(i > 0) {
    const previousDate = MOCK_EVENTS[i - 1]['date_to'];
    event['date_from'] = previousDate;
  } else {
    event['date_from'] = getRandomDate();
  }
  event['base_price'] = getRandomInteger(3, 20) * 100;
  event['date_to'] =  addDayGap(event['date_from']);
  event['destination'] = generateEventDestination();
  event['id'] = i + 1;
  event['is_favorite'] = Boolean(getRandomInteger(0, 1));
  const type = TYPES[getRandomInteger(0, TYPES.length - 1)];
  event['offers'] = generateEventOffers(type);
  event['type'] = type;
  MOCK_EVENTS.push(event);
}

export {
  MOCK_EVENTS,
  TYPES
};
