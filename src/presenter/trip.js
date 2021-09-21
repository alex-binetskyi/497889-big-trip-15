import TripSortView from '../view/trip-sort.js';
import TripEventListView from '../view/trip-events-list.js';
import TripEventListEmptyView from '../view/trip-events-list-empty.js';
import EventPresenter from './event.js';
import EventNewPresenter from './event-new.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import {sortByPrice, sortByTime} from '../utils/common.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {filter} from '../utils/filter.js';

export default class Trip {
  constructor(tripContainer, eventsModel, filterModel) {
    this._tripContainer = tripContainer; // siteTripEvents?
    this._eventPresenter = new Map();

    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._emptyEventsListComponent = null;

    this._sortComponent = new TripSortView();
    this._eventsListComponent = new TripEventListView();
    this._emptyEventsListComponent = new TripEventListEmptyView();

    this._filterType = FilterType.EVERYTHING;
    this._currentSortType = SortType.DAY;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._eventNewPresenter = new EventNewPresenter(this._eventsListComponent, this._handleViewAction);
  }

  init() {
    // Инициализация.
    this._renderSort();
    this._renderBoard();

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  destroy() {
    this._currentSortType = SortType.DEFAULT;
    this._clearEventList({resetRenderedPointCount: true, resetSortType: true});

    remove(this._eventsListComponent);
    remove(this._sortComponent);

    this._eventsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createEvent(callback) {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._eventNewPresenter.init(callback);
  }

  _getEvents() {
    this._filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filtredEvents = filter[this._filterType](events);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filtredEvents.sort(sortByTime);
      case SortType.PRICE:
        return filtredEvents.sort(sortByPrice);
    }

    return filtredEvents;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearEventList({resetSortType: true});
    this._renderEvents();
  }

  _clearEventList() {
    this._eventNewPresenter.destroy();
    this._eventPresenter.forEach((presenter) => presenter.destroy());
    this._eventPresenter.clear();

    if (this._emptyEventsListComponent) {
      remove(this._emptyEventsListComponent);
    }
  }

  _handleModeChange() {
    this._eventNewPresenter.destroy();
    this._eventPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clearEventList();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearEventList({resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _renderSort() {
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new TripSortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEvent(event) {
    const point = new EventPresenter(this._eventsListComponent, this._handleViewAction, this._handleModeChange);
    point.init(event);
    this._eventPresenter.set(event.id, point);
  }

  _renderEvents() {
    // Рендер событий.
    this._getEvents().forEach((event) => this._renderEvent(event));
  }

  _renderEventsList() {
    // Рендер списка для событий.
    render(this._tripContainer, this._eventsListComponent, RenderPosition.BEFOREEND);
  }

  _renderNoEvents() {
    // Рендер списка для событий.
    this._emptyEventsListComponent = new TripEventListEmptyView(this._filterType);
    render(this._tripContainer, this._emptyEventsListComponent, RenderPosition.BEFOREEND);
  }

  _renderBoard() {
    if(this._getEvents().length > 0) {
      this._renderEventsList();
      this._renderEvents();
    } else {
      this._renderNoEvents();
    }
  }
}
