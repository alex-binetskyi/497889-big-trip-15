import TripSortView from '../view/trip-sort.js';
import TripEventListView from '../view/trip-events-list.js';
import TripEventListEmptyView from '../view/trip-events-list-empty.js';
import EventPresenter from './event.js';
import { SortType } from '../const.js';
import {updateItem, sortByPrice, sortByTime} from '../utils/common.js';
import {render, RenderPosition} from '../utils/render.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer; // siteTripEvents?
    this._eventPresenter = new Map();

    this._sortComponent = new TripSortView();
    this._eventsListComponent = new TripEventListView();
    this._emptyEventsListComponent = new TripEventListEmptyView();
    this._currentSortType = SortType.DAY;

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(events) {
    // Инициализация.
    this._events = events.slice();
    this._startEvents = events.slice();
    this._eventsCount = this._events.length;
    this._renderBoard();
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._events.sort(sortByTime);
        break;
      case SortType.PRICE:
        this._events.sort(sortByPrice);
        break;
      default:
        this._events = [...this._startEvents];
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);
    this._clearEventList();
    this._renderEvents();
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
    this._sourcedEvents = updateItem(this._sourcedEvents, updatedEvent);
    this._eventPresenter.get(updatedEvent.id).init(updatedEvent);
  }

  _renderSort() {
    // Рендер сортировки.
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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
