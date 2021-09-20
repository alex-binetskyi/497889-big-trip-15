import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const reducer = (accumulator, currentValue) => accumulator + currentValue;

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const sortByPrice = (a, b) => b.basePrice - a.basePrice;
export const sortByTime = (a, b) => {
  const durationPointA = dayjs(a.endDate).diff(dayjs(a.startDate));
  const durationPointB = dayjs(b.endDate).diff(dayjs(b.startDate));

  return (durationPointA >= durationPointB)? -1 : 1;
};
