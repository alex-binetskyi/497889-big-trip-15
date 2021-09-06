import TripSortView from '../view/trip-sort.js';
import TripEventListView from '../view/trip-events-list.js';
import TripEventListEmptyView from '../view/trip-events-list-empty.js';
import EventPresenter from './event.js';

import {updateItem} from '../utils/common.js';
import {render, RenderPosition} from '../utils/render.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer; // siteTripEvents?
    this._eventPresenter = new Map();

    this._sortComponent = new TripSortView();
    this._eventsListComponent = new TripEventListView();
    this._emptyEventsListComponent = new TripEventListEmptyView();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(events) {
    // Инициализация.
    this._events = [...events];
    this._eventsCount = this._events.length;
    this._renderBoard();
  }

  _clearEventList() {
    this._eventPresenter.forEach((presenter) => presenter.destroy());
    this._eventPresenter.clear();
  }

  _handleModeChange() {
    this._eventPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleEventChange(updatedEvent) {
    this._events = updateItem(this._events, updatedEvent);
    this._eventPresenter.get(updatedEvent.id).init(updatedEvent);
  }

  _renderSort() {
    // Рендер сортировки.
    render(this._eventsListComponent, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(event) {
    const point = new EventPresenter(this._eventsListComponent, this._handleEventChange, this._handleModeChange);
    point.init(event);
    this._eventPresenter.set(event.id, point);
  }

  _renderEvents() {
    // Рендер событий.
    this._events.forEach((event) => this._renderEvent(event));
  }

  _renderEventsList() {
    // Рендер списка для событий.
    render(this._tripContainer, this._eventsListComponent, RenderPosition.BEFOREEND);
  }

  _renderNoEvents() {
    // Рендер списка для событий.
    render(this._tripContainer, this._emptyEventsListComponent, RenderPosition.BEFOREEND);
  }

  _renderBoard() {
    if(this._eventsCount) {
      this._renderSort();
      this._renderEventsList();
      this._renderEvents();
    } else {
      this._renderNoEvents();
    }
  }
}
