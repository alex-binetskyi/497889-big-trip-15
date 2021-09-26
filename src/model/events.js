import AbstractObserver from '../utils/abstract-observer.js';

export default class Events extends AbstractObserver {
  constructor() {
    super();
    this._events = [];
  }

  setEvents(updateType, events) {
    this._events = events.slice();
    this._notify(updateType);
  }

  getEvents() {
    return this._events;
  }

  updateEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      return this._events;
    }

    this._events = [
      ...this._events.slice(0, index),
      update,
      ...this._events.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this._events = [
      update,
      ...this._events,
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    this._events = [
      ...this._events.slice(0, index),
      ...this._events.slice(index + 1),
    ];

    this._notify(updateType);
  }

  static adaptToClient(event) {
    const adaptedEvent = Object.assign(
      {},
      event,
      {
        basePrice: event['base_price'],
        isFavorite: event['is_favorite'],
        dateFrom: event['date_from'],
        dateTo: event['date_to'],
      },
    );

    delete adaptedEvent['base_price'];
    delete adaptedEvent['is_favorite'];
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];

    return adaptedEvent;
  }

  static adaptToServer(event) {
    const adaptedEvent = Object.assign(
      {},
      event,
      {
        'base_price': event.basePrice,
        'is_favorite': event.isFavorite,
        'date_from': event.dateFrom,
        'date_to': event.dateTo,
      },
    );

    delete adaptedEvent.basePrice;
    delete adaptedEvent.isFavorite;
    delete adaptedEvent.dateFrom;
    delete adaptedEvent.dateTo;

    return adaptedEvent;
  }
}
