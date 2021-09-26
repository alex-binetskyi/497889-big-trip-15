import dayjs from 'dayjs';

const getDiffTimeEvent = (startTime, endTime) => {
  const startEvent = dayjs(startTime);
  const endEvent = dayjs(endTime);
  return endEvent.diff(startEvent);
};

export const sortByPrice = (a, b) => b.basePrice - a.basePrice;
export const sortByDay = (a, b) => dayjs(a.dateFrom) - dayjs(b.dateFrom);
export const sortByTime = (a, b) => getDiffTimeEvent(b.dateFrom, b.dateTo) - getDiffTimeEvent(a.dateFrom, a.dateTo);
