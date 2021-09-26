import TripInfoView from '../view/trip-info.js';
import SortView from '../view/sort.js';
import TripEventListView from '../view/events-list.js';
import TripEventListEmptyView from '../view/events-list-empty.js';
import LoadingView from '../view/loading.js';
import EventPresenter, {State as EventPresenterViewState} from './event.js';
import EventNewPresenter from './event-new.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import {sortByDay, sortByPrice, sortByTime} from '../utils/sort.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {filter} from '../utils/filter.js';

export default class Trip {
  constructor(tripContainer, tripInfoContainer, eventsModel, filterModel, offersModel, destinationsModel, api) {
    this._tripContainer = tripContainer;
    this._tripInfoContainer = tripInfoContainer;
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._api = api;
    this._eventPresenter = new Map();
    this._filterType = FilterType.EVERYTHING;
    this._currentSortType = SortType.DAY.name;
    this._isLoading = true;

    this._sortComponent = null;
    this._emptyEventsListComponent = null;
    this._eventsListComponent = new TripEventListView();
    this._loadingComponent = new LoadingView();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._eventNewPresenter = new EventNewPresenter(this._eventsListComponent, this._handleViewAction);
  }

  init() {
    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderBoard();
  }

  destroy() {
    this._clearBoard({resetSortType: true});

    remove(this._eventsListComponent);
    remove(this._tripInfoComponent);

    this._eventsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createEvent(callback) {
    this._offers = this._offersModel.getOffers();
    this._destinations = this._destinationsModel.getDestinations();
    this._currentSortType = SortType.DAY.name;
    this._filterModel.setFilter(UpdateType.MINOR, FilterType.EVERYTHING);

    remove(this._emptyEventsListComponent);
    render(this._tripContainer, this._eventsListComponent, RenderPosition.BEFOREEND);
    this._eventNewPresenter.init(this._offers, this._destinations, callback);
  }

  _getEvents() {
    this._filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filtredEvents = filter[this._filterType](events);

    switch (this._currentSortType) {
      case SortType.TIME.name:
        return filtredEvents.sort(sortByTime);
      case SortType.PRICE.name:
        return filtredEvents.sort(sortByPrice);
    }

    return filtredEvents.sort(sortByDay);
  }

  renderTripInfo() {
    const events = this._eventsModel.getEvents();
    if (!events.length) {
      return;
    }

    if(this._tripInfoComponent !== null) {
      this._tripInfoComponent = null;
    }
    const sortedEvents = this._eventsModel.getEvents().slice().sort(sortByDay);

    this._tripInfoComponent = new TripInfoView(sortedEvents);

    render(this._tripInfoContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventPresenter.get(update.id).setViewState(EventPresenterViewState.SAVING);
        this._api.updateEvent(update)
          .then((response) => {
            this._eventsModel.updateEvent(updateType, response);
          })
          .catch(() => {
            this._eventPresenter.get(update.id).setViewState(EventPresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_EVENT:
        this._eventNewPresenter.setSaving();
        this._api.addEvent(update)
          .then((response) => {
            this._eventsModel.addEvent(updateType, response);
          })
          .catch(() => {
            this._eventNewPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_EVENT:
        this._eventPresenter.get(update.id).setViewState(EventPresenterViewState.DELETING);
        this._api.deleteEvent(update)
          .then(() => {
            this._eventsModel.deleteEvent(updateType, update);
          })
          .catch(() => {
            this._eventPresenter.get(update.id).setViewState(EventPresenterViewState.ABORTING);
          });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetSortType: true});
        this._renderBoard();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderBoard();
        break;
    }
  }

  _handleModeChange() {
    this._eventNewPresenter.destroy();
    this._eventPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._renderSort();
    this._clearBoard();
    this._renderBoard();
  }

  _renderSort() {
    remove(this._sortComponent);

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(event) {
    this._offers = this._offersModel.getOffers();
    this._destinations = this._destinationsModel.getDestinations();

    const eventPresenter = new EventPresenter(this._eventsListComponent, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event, this._offers, this._destinations);
    this._eventPresenter.set(event.id, eventPresenter);
  }

  _renderEvents(events) {
    events.forEach((event) => this._renderEvent(event));
  }

  _renderEventsList() {
    render(this._tripContainer, this._eventsListComponent, RenderPosition.BEFOREEND);
    const events = this._getEvents();
    this._renderEvents(events);
  }

  _renderNoEvents() {
    this._emptyEventsListComponent = new TripEventListEmptyView(this._filterType);
    render(this._tripContainer, this._emptyEventsListComponent, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    render(this._tripContainer, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _clearBoard({resetSortType = false} = {}) {
    this._eventNewPresenter.destroy();
    this._eventPresenter.forEach((presenter) =>presenter.destroy());
    this._eventPresenter.clear();

    remove(this._emptyEventsListComponent);
    remove(this._sortComponent);
    remove(this._loadingComponent);
    remove(this._eventsListComponent);
    remove(this._tripInfoComponent);

    if(resetSortType) {
      this._currentSortType = SortType.DAY.name;
    }
  }

  _renderBoard() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (!this._getEvents().length) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderEventsList();
    this.renderTripInfo();
  }
}
