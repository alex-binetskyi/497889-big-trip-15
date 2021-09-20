import TripSortView from '../view/trip-sort.js';
import TripEventListView from '../view/trip-events-list.js';
import TripEventListEmptyView from '../view/trip-events-list-empty.js';
import EventPresenter from './event.js';
import { SortType } from '../const.js';
import {sortByPrice, sortByTime} from '../utils/common.js';
import {render, RenderPosition} from '../utils/render.js';

export default class Trip {
  constructor(tripContainer, eventsModel) {
    this._tripContainer = tripContainer; // siteTripEvents?
    this._eventPresenter = new Map();

    this._eventsModel = eventsModel;

    this._sortComponent = new TripSortView();
    this._eventsListComponent = new TripEventListView();
    this._emptyEventsListComponent = new TripEventListEmptyView();
    this._currentSortType = SortType.DAY;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._eventsModel.addObserver(this._handleModelEvent);
  }

  init() {
    // Инициализация.
    this._renderBoard();
  }

  _getEvents() {
    switch (this._currentSortType) {
      case SortType.TIME:
        return this._eventsModel.getEvents().slice().sort(sortByTime);
      case SortType.PRICE:
        return this._eventsModel.getEvents().slice().sort(sortByPrice);
    }

    return this._eventsModel.getEvents();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
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

  _handleViewAction(actionType, updateType, update) {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  }

  _handleModelEvent(updateType, data) {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  }

  _renderSort() {
    // Рендер сортировки.
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderEvent(event) {
    const point = new EventPresenter(this._eventsListComponent, this._handleViewAction, this._handleModeChange);
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
    if(this._getEvents()) {
      this._renderSort();
      this._renderEventsList();
      this._renderEvents();
    } else {
      this._renderNoEvents();
    }
  }
}
