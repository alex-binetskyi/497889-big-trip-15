import { getRandomInteger } from '../utils/common';
import { getRandomDate, addDayGap } from '../utils/event';
import { TYPES } from '../const';
import { eventOffers } from './event-offers';
import { matchTypeOffers } from '../utils/form';
import { DESTINATIONS } from './event-destination';
import dayjs from 'dayjs';
import {nanoid} from 'nanoid';

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
  event['destination'] = DESTINATIONS[getRandomInteger(0, DESTINATIONS.length -1)];
  event['id'] = nanoid();
  event.isFavorite = Boolean(getRandomInteger(0, 1));
  const type = TYPES[getRandomInteger(0, TYPES.length - 1)];
  event['type'] = type;
  event['offers'] = matchTypeOffers(type, eventOffers);

  event['dateFrom'] = dayjs(event['dateFrom']).format('YYYY-MM-DDTHH:mm:ss.ms[Z]');
  event['dateTo'] = dayjs(event['dateTo']).format('YYYY-MM-DDTHH:mm:ss.ms[Z]');

  MOCK_EVENTS.push(event);
}

export { MOCK_EVENTS };
