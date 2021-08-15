import dayjs from 'dayjs';
import { TIME } from './const';
import duration from 'dayjs/plugin/duration';
import localizedFormat  from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);
dayjs.extend(duration);

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomString = (text, split) => {
  const textArray = text.split(split);
  const lengthString = getRandomInteger(1, textArray.length - 1);
  let newString = '';

  for(let i = 0; i < lengthString; i++) {
    const string = textArray[getRandomInteger(0, textArray.length - 1)];
    newString += (i === lengthString - 1) ? string : `${string} `;
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
  const daysRange = 1;
  const hoursRange = TIME.HOUR - 1;
  const minutesRange = TIME.MINUTE - 1;
  const dayOffset = getRandomInteger(0, daysRange);
  const hoursOffset = getRandomInteger(0, hoursRange);
  const minutesOffset = getRandomInteger(0, minutesRange);
  return dayjs(date).add(dayOffset, 'day').add(hoursOffset, 'hour').add(minutesOffset, 'minute');
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

const reducer = (accumulator, currentValue) => accumulator + currentValue;

export {
  getRandomInteger,
  getRandomString,
  getRandomDate,
  addDayGap,
  formatDifferenceDates,
  reducer
};
