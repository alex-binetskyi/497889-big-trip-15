import dayjs from 'dayjs';
import { getRandomInteger } from './common';
import { TIME } from '../const.js';
import duration from 'dayjs/plugin/duration';
import localizedFormat  from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);
dayjs.extend(duration);

export const getRandomString = (text, split) => {
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

export const getRandomDate = () => {
  const daysRange = TIME.DAY - 1;
  const hoursRange = TIME.HOUR - 1;
  const minutesRange = TIME.MINUTE - 1;
  const dayOffset = getRandomInteger(-daysRange, daysRange);
  const hoursOffset = getRandomInteger(0, hoursRange);
  const minutesOffset = getRandomInteger(0, minutesRange);
  return dayjs().add(dayOffset, 'day').add(hoursOffset, 'hour').add(minutesOffset, 'minute');
};

export const addDayGap = (date) => {
  const daysRange = 1;
  const hoursRange = TIME.HOUR - 1;
  const minutesRange = TIME.MINUTE - 1;
  const dayOffset = getRandomInteger(0, daysRange);
  const hoursOffset = getRandomInteger(0, hoursRange);
  const minutesOffset = getRandomInteger(0, minutesRange);
  return dayjs(date).add(dayOffset, 'day').add(hoursOffset, 'hour').add(minutesOffset, 'minute');
};

export const isDatesEqual = (dateA, dateB) => ((dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, 'D'));

export const formatDifferenceDates = (dateFrom, dateTo) => {
  const difference = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));
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
