import {FilterType} from '../const';
import dayjs from 'dayjs';

const currentDate = dayjs(Date.now()).format('YYYY-MM-DDTHH:mm:ss.ms[Z]');

export const filter = {
  [FilterType.EVERYTHING]: (events) => events.filter((event) => event),
  [FilterType.FUTURE]: (events) => events.filter((event) => dayjs(event.dateFrom) >= dayjs(currentDate)),
  [FilterType.PAST]: (events) => events.filter((event) => dayjs(event.dateTo) <= dayjs(currentDate)),
};
