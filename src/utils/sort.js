import dayjs from 'dayjs';

const getDiffTimePoint = (startTime, endTime) => {
  const startEvent = dayjs(startTime);
  const endEvent = dayjs(endTime);
  return endEvent.diff(startEvent);
};

export const sortByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;
export const sortByDay = (pointA, pointB) => dayjs(pointA.dateFrom) - dayjs(pointB.dateFrom);
export const sortByTime = (pointA, pointB) => getDiffTimePoint(pointB.dateFrom, pointB.dateTo) - getDiffTimePoint(pointA.dateFrom, pointA.dateTo);
