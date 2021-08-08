import dayjs from 'dayjs';
import { TIME } from './const';
import duration from 'dayjs/plugin/duration';
import localizedFormat  from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);
dayjs.extend(duration);

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

function splitString(stringToSplit, separator = ' ') {
  const arrayOfStrings = stringToSplit.split(separator);
  return arrayOfStrings;
}

const getRandomString = (text, split) => {
  const textArray = splitString(text, split);
  const lengthString = getRandomInteger(1, textArray.length - 1);
  let newString = '';

  for(let i = 0; i < lengthString; i++) {
    const string = textArray[getRandomInteger(0, textArray.length - 1)];
    if(i === lengthString - 1) {
      newString += `${string}`;
    } else {
      newString += `${string} `;
    }
    textArray.splice(textArray.indexOf(string), textArray.indexOf(string));
  }
  return newString;
};

const getRandomDate = () => {
  const daysRange = TIME.DAY - 1;
  const hoursRange = TIME.HOUR - 1;
  const minutesRange = TIME.MINUTE - 1;
  const dayOffset = getRandomInteger(-daysRange, daysRange);
  const hoursOffset = getRandomInteger(0, hoursRange);
  const minutesOffset = getRandomInteger(0, minutesRange);
  return dayjs().add(dayOffset, 'day').add(hoursOffset, 'hour').add(minutesOffset, 'minute');
};

const addDayGap = (date) => {
  const daysRange = 2;
  const hoursRange = TIME.HOUR - 1;
  const minutesRange = TIME.MINUTE - 1;
  const dayOffset = getRandomInteger(0, daysRange);
  const hoursOffset = getRandomInteger(0, hoursRange);
  const minutesOffset = getRandomInteger(0, minutesRange);
  return dayjs(date).add(dayOffset, 'day').add(hoursOffset, 'hour').add(minutesOffset, 'minute');
};

const formatDate = (date, format) => {
  const newDate = date.format(format);
  return newDate;
};

const formatDifferenceDates = (dateFrom, dateTo) => {
  const difference = dayjs.duration(dateTo.diff(dateFrom));
  let formatDifference;
  if(difference.days()) {
    formatDifference = difference.format('D[D] H[H] m[M]');
  } else if(difference.hours()) {
    formatDifference = difference.format('H[H] m[M]');
  } else {
    formatDifference = difference.format('m[M]');
  }

  return formatDifference;
};

const formatOfferLabel = (string) => {
  const formatedStrind = string.toLowerCase().replace('/ /g', '-');
  return formatedStrind;
};

const renderTypes = (types, id) => {
  let optionTypes = '';
  for(const type of types) {
    const template = `
    <div class="event__type-item">
      <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${type}</label>
    </div>
  `;
    optionTypes += template;
  }
  return optionTypes;
};

const renderDestinations = (towns) => {
  let destinations = '';

  for(const town of towns) {
    const template = `<option value="${town}"></option>`;
    destinations += template;
  }
  return destinations;
};

const renderOffers = (offers, id) => {
  if(offers.length) {
    const formOffers = offers.map((offer) => {
      const {title, price} = offer;
      const template = `
        <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${id}" type="checkbox" name="event-offer-luggage" ${offer.isSelected ? 'checked=""' : ''}>
        <label class="event__offer-label" for="event-offer-${formatOfferLabel(title)}-${id}">
          <span class="event__offer-title">${title}</span>
          +€&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
        </div>
      `;
      return template;
    }).join('');
    const renderedOffers = `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${formOffers}
      </div>
    </section>
    `;
    return renderedOffers;
  } else {
    return '';
  }
};

const renderImages = (images) => {
  let outputImages = '';
  for(const image of images) {
    const {src, description} = image;
    const template = `<img class="event__photo" src="${src}" alt="${description}">`;
    outputImages += template;
  }
  return outputImages;
};

export {
  getRandomInteger,
  getRandomString,
  getRandomDate,
  formatDate,
  addDayGap,
  formatDifferenceDates,
  renderTypes,
  renderDestinations,
  renderOffers,
  renderImages
};
