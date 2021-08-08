import { formatDate } from '../utils';
import { MOCK_EVENTS } from '../mock/events';

const towns = MOCK_EVENTS.map((event) => event['destination'].name);


const writePath = (places) => {
  let path = '';

  if(places.length > 3) {
    path = `${places[0]} — ... — ${places[places.length - 1]}`
  } else {
    for(let i = 0; i < places.length; i++) {
      if (i === places.length - 1) {
        path += places[i];
      } else {
        path += `${places[i]} — `;
      }
    }
  }

  return path;
};

const writeDates = (dateFrom, dateTo) => {
  const date = `${formatDate(dateFrom, 'MMM D')} — ${formatDate(dateTo, 'MMM D')}`;
  return date;
};

export const createTripInfoTemplate = () => (`
	<div class="trip-info__main">
    <h1 class="trip-info__title">${writePath(towns)}</h1>
    <p class="trip-info__dates">${writeDates(MOCK_EVENTS[0]['date_from'], MOCK_EVENTS[MOCK_EVENTS.length -1]['date_to'])}</p>
  </div>
`);
