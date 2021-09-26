import dayjs from 'dayjs';

const SECONDS_IN_HOUR = 3600;
const MINUTES_IN_HOUR = 60;

export const getTimeFormat = (milliseconds) => {
  const seconds = Math.trunc(milliseconds / 1000);
  let minutes = 0;
  if (milliseconds === 0) {
    return '';
  } if (milliseconds < SECONDS_IN_HOUR) {
    minutes = Math.trunc(seconds / MINUTES_IN_HOUR);
    return `${minutes}M`;
  }
  const hours = Math.trunc(seconds / SECONDS_IN_HOUR);
  minutes = Math.trunc((seconds % SECONDS_IN_HOUR) / MINUTES_IN_HOUR);
  return `${hours}H ${minutes}m`;
};

export const countEventsTypes = (events) => {
  let result = null;
  result = Object.fromEntries(events.map((event) => [event.type, 0]));
  events.forEach((event) => {
    result[event.type] += 1;
  });
  return result;
};

export const countTimeByType = (events) => {
  const dataSortByTime = events.slice().sort((elem1, elem2) => {
    dayjs(elem2.dateTo).diff(dayjs(elem2.dateFrom)) - dayjs(elem1.dateTo).diff(dayjs(elem1.dateFrom));
  });

  let result = null;
  result = Object.fromEntries(dataSortByTime.map((item) => [item.type, 0]));
  dataSortByTime.forEach((item) => {
    result[item.type] += (dayjs(item.dateTo).diff(dayjs(item.dateFrom)));
  });
  return result;
};

export const countMoneyByType = (events) => {
  const dataSortByPrice = events.slice().sort((a, b) => b.basePrice - a.basePrice);

  let result = null;
  result = Object.fromEntries(dataSortByPrice.map((item) => [item.type, 0]));
  dataSortByPrice.forEach((item) => {
    result[item.type] += item.basePrice;
  });
  return result;
};

export const getSortType = ((val) => Object.keys(val).sort((a, b) => val[b] - val[a]));
