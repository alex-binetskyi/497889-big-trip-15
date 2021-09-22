export const TIME = {
  MILLISECOND: 1000,
  SECOND: 60,
  MINUTE: 60,
  HOUR: 24,
  DAY: 7,
};

export const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const MenuItem = {
  ADD_NEW_POINT: 'menu_add_new_point',
  TABLE: 'menu_table',
  STATS: 'menu_stats',
};
