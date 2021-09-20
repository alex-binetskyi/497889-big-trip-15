import Smart from './smart.js';
import { TYPES } from '../const';
import { TOWNS } from '../mock/event-destination';
import { renderTypes, renderDestinations, renderOffers } from './view-utils';
import { eventOffers } from '../mock/event-offers';
import { DESTINATIONS } from '../mock/event-destination';
import { matchTypeOffers, matchCity } from '../utils/form';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const renderImages = (pictures) => {
  let images = '';

  for (const picture of pictures) {
    images += `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`;
  }

  return (
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${images}
      </div>
    </div>`
  );
};

const createFormEventTemplate = (event) => {
  const { basePrice: price, dateFrom: dateFrom, dateTo: dateTo, destination, id, offers, type } = event;
  const {description, name, pictures} = destination;

  return `<li class="trip-events__item">
		<form class="event event--edit" action="#" method="post">
			<header class="event__header">
				<div class="event__type-wrapper">
					<label class="event__type  event__type-btn" for="event-type-toggle-${id}">
						<span class="visually-hidden">Choose event type</span>
						<img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
					</label>
					<input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

					<div class="event__type-list">
						<fieldset class="event__type-group">
							<legend class="visually-hidden">Event type</legend>

							${renderTypes(TYPES, id)}
						</fieldset>
					</div>
				</div>

				<div class="event__field-group  event__field-group--destination">
					<label class="event__label  event__type-output" for="event-destination-${id}">
						${type}
					</label>
					<input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${name}" list="destination-list-${id}">
					<datalist id="destination-list-${id}">
						${renderDestinations(TOWNS)}
					</datalist>
				</div>

				<div class="event__field-group  event__field-group--time">
					<label class="visually-hidden" for="event-start-time-${id}">From</label>
					<input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${dayjs(dateFrom).format('HH:mm')}">
					&mdash;
					<label class="visually-hidden" for="event-end-time-${id}">To</label>
					<input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${dayjs(dateTo).format('HH:mm')}">
				</div>

				<div class="event__field-group  event__field-group--price">
					<label class="event__label" for="event-price-${id}">
						<span class="visually-hidden">Price</span>
						&euro;
					</label>
					<input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${price}">
				</div>

				<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
				<button class="event__reset-btn" type="reset">Delete</button>
				<button class="event__rollup-btn" type="button">
					<span class="visually-hidden">Open event</span>
				</button>
			</header>
			<section class="event__details">
				${renderOffers(offers, id)}

				<section class="event__section  event__section--destination">
					<h3 class="event__section-title  event__section-title--destination">Destination</h3>
					<p class="event__destination-description">${description}</p>
          ${renderImages(pictures)}
				</section>
			</section>
		</form>
	</li>`;
};

export default class FormEvent extends Smart {
  constructor(event) {
    super();
    this._event = event;
    this._data = FormEvent.parseEventToData(event);
    this._datepickerStart = null;
    this._datepickerEnd = null;

    this._eventTypeSelectHandler = this._eventTypeSelectHandler.bind(this);
    this._eventDestinationInputHandler = this._eventDestinationInputHandler.bind(this);
    this._eventDestinationChangeHandler = this._eventDestinationChangeHandler.bind(this);
    this._eventPriceChangeHandler = this._eventPriceChangeHandler.bind(this);
    this._eventPriceInputHandler = this._eventPriceInputHandler.bind(this);
    this._eventOffersClickHandler = this._eventOffersClickHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._editClickHandler = this._editClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formRemoveHandler = this._formRemoveHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepickers();
  }

  getTemplate() {
    return createFormEventTemplate(this._data);
  }

  reset(event) {
    this.updateData(FormEvent.parseEventToData(event));
  }

  restoreHandlers() { // restore handlers
    this._setInnerHandlers();
    this.setEditClickHandler(this._callback.editClick);
    this.setEditSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteSubmit);
    this._setDatepickers();
  }

  _setDatepickers() {
    if (this._datepickerStart) {
      // В случае обновления компонента удаляем вспомогательные DOM-элементы,
      // которые создает flatpickr при инициализации
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }

    if (this._datepickerEnd) {
      // В случае обновления компонента удаляем вспомогательные DOM-элементы,
      // которые создает flatpickr при инициализации
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }

    this._datepickerStart = flatpickr(
      this.getElement().querySelector(`#event-start-time-${this._data.id}`),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._data.dateFrom,
        onChange: this._startDateChangeHandler, // На событие flatpickr передаём наш колбэк
      },
    );

    this._datepickerEnd = flatpickr(
      this.getElement().querySelector(`#event-end-time-${this._data.id}`),
      {
        dateFormat: 'd/m/y H:i',
        minDate: this._data.dateFrom,
        enableTime: true,
        defaultDate: this._data.dateTo,
        onChange: this._endDateChangeHandler, // На событие flatpickr передаём наш колбэк
      },
    );
  }

  _eventTypeSelectHandler(evt) {
    evt.preventDefault();
    const value = evt.target.parentElement.querySelector('input').value;

    this.updateData({
      type: value,
      offers: matchTypeOffers(value, eventOffers),
    });
  }

  _eventDestinationInputHandler(evt) {
    if(!evt.target.value.length) {
      evt.target.setCustomValidity('This field should be not empty.');
      this.getElement().querySelector('.event__save-btn').disabled = true;
    }
    else {
      this.getElement().querySelector('.event__save-btn').disabled = false;
      evt.target.setCustomValidity('');
    }

    evt.target.reportValidity();
  }

  _eventDestinationChangeHandler(evt) {
    const selectedDestination = matchCity(evt.target.value, DESTINATIONS);

    if(!selectedDestination) {
      this.getElement().querySelector('.event__save-btn').disabled = true;
      evt.target.setCustomValidity('A city with this name is not available. Please choose another one or make sure you entered this one correctly.');
      evt.target.reportValidity();
    }
    else {
      this.getElement().querySelector('.event__save-btn').disabled = false;
      this.updateData({
        destination: {
          description: selectedDestination.description,
          name: evt.target.value,
          pictures: selectedDestination.pictures,
        },
      });
    }
  }

  _eventPriceChangeHandler(evt) { // change input price
    this.updateData({
      'basePrice': evt.target.value,
    }, true);
  }

  _eventPriceInputHandler(evt) {
    evt.target.value = evt.target.value.replace(/[^0-9]/, '');

    const price = Number(evt.target.value);

    if (!price || price === 0) {
      this.getElement().querySelector('.event__save-btn').disabled = true;
      evt.target.setCustomValidity('The price field cannot be empty or equal to zero.');
    }
    else {
      this.getElement().querySelector('.event__save-btn').disabled = false;
      evt.target.setCustomValidity('');
    }

    evt.target.reportValidity();
  }

  _eventOffersClickHandler(evt) {
    if (evt.target.nodeName === 'INPUT') {
      const text = this.getElement().querySelector(`label[for="${evt.target.getAttribute('id')}"] .event__offer-title`).textContent;

      const IndexOfferChecked = this._data.offers.findIndex((offer) =>  offer.title.includes(text));
      const oldOffers = this._data.offers;
      const offerChecked = Object.assign(
        {},
        this._data.offers[IndexOfferChecked],
        {
          isSelected: evt.target.checked,
        },
      );

      const newOffers = [
        ...oldOffers.slice(0, IndexOfferChecked),
        offerChecked,
        ...oldOffers.slice(IndexOfferChecked + 1),
      ];

      this.updateData({
        offers: newOffers,
      }, true);
    }
  }

  _startDateChangeHandler([userStartDate]) {
    if (dayjs(this._data.dateTo).diff(dayjs(userStartDate)) < 0) {
      userStartDate = this._data.dateTo;
    }
    this.updateData({
      dateFrom: userStartDate,
    });
  }

  _endDateChangeHandler([userEndDate]) {
    this.updateData({
      dateTo: userEndDate,
    });
  }

  _setInnerHandlers() { // обработчики событий View
    this.getElement().querySelector('.event__type-list').addEventListener('click', this._eventTypeSelectHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('input', this._eventDestinationInputHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._eventDestinationChangeHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('change', this._eventPriceChangeHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('input', this._eventPriceInputHandler);
    this.getElement().querySelector('.event__details').addEventListener('click', this._eventOffersClickHandler);
    this.getElement().querySelectorAll('.event__input--time')[0].addEventListener('click', this._dateFromChangeHandler);
    this.getElement().querySelectorAll('.event__input--time')[1].addEventListener('click', this._dateToChangeHandler);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._data);
  }

  _formRemoveHandler(evt) {
    evt.preventDefault();
    this._callback.deleteSubmit();
    this._element = null;
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  setEditSubmitHandler(callback) {

    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteSubmit = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formRemoveHandler);
  }

  static parseEventToData(event) {
    return Object.assign(
      {},
      event,
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    return data;
  }
}
