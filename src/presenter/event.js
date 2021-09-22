import TripEventView from '../view/trip-event.js';
import FormEventView from '../view/form-event.js';

import {render, RenderPosition, replace, remove} from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';

import {isDatesEqual} from '../utils/event.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  constructor(container, changeData, changeMode) {
    this._container = container;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._replaceEventToForm = this._replaceEventToForm.bind(this);
    this._replaceFormToEvent = this._replaceFormToEvent.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleEditClickRollup = this._handleEditClickRollup.bind(this);
    this._handleEditSubmit = this._handleEditSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init(event) {
    this._event = event; // Событие - объект данных.

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new TripEventView(event); // Отображение события.
    this._pointEditComponent = new FormEventView(event); // Форма изменения события.

    this._pointComponent.setEditClickHandler(this._replaceEventToForm);
    this._pointEditComponent.setEditClickHandler(this._handleEditClickRollup);
    this._pointEditComponent.setEditSubmitHandler(this._handleEditSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this._container, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToEvent();
    }
  }

  _replaceEventToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToEvent() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _handleEditClickRollup() {
    this._pointEditComponent.reset(this._event);
    this._replaceFormToEvent();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._pointEditComponent.reset(this._event);
      this._replaceFormToEvent();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._event,
        {
          isFavorite: !this._event.isFavorite,
        },
      ),
    );
  }

  _handleEditSubmit(update) {
    const isDateFromEqual = isDatesEqual(this._event.dateFrom, update.dateFrom);
    const isDateToEqual = isDatesEqual(this._event.dateTo, update.dateTo);
    const isPriceEqual = this._event.basePrice === update.basePrice;
    const isDestinationEqual = this._event.destination.name === update.destination.name;

    const isMinorUpdate = !isDateFromEqual || !isDateToEqual || !isPriceEqual || !isDestinationEqual;

    this._changeData(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
    this._replaceFormToEvent();
  }

  _handleDeleteClick(event) {
    this._changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      event,
    );
  }
}
