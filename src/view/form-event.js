import flatpickr from 'flatpickr';
import dayjs from 'dayjs';
import Smart from './smart.js';
import { getFirstLetterInCapitalLetters } from '../utils/common';
import { formValidity } from '../utils/form';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createDestinationTemplate = (destination) => {
  const {description, pictures} = destination;

  const createDestinationPhoto = () => {
    if (pictures !== 0) {
      return `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${pictures.map(({src, descriptionPhoto}) => `<img class="event__photo" src="${src}" alt="${descriptionPhoto}">`).join('')}
    </div>
  </div>`;}
  };

  if (destination.name) {
    return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    ${createDestinationPhoto()}
  </section>`;
  }
  return '';
};

const createEventRollupButtonTemplate = (isNewEvent, isDisabled) => (
  `${!isNewEvent ? `<button class="event__rollup-btn" type="button" ${isDisabled? 'disabled' : ''}>
    <span class="visually-hidden">Open event</span>
  </button>`: ''}`
);

const createContentButton = (isNewEvent, isDeleting) => {
  const editButton = isDeleting ? 'Deleting...' : 'Delete';
  return `${isNewEvent ? 'Cancel' : editButton}`;
};

//генерация опций города
const createCityList = (destinations) => (
  destinations.map(({name}) => (
    `<option value="${name}"></option>`
  )).join('')
);

//генерация тайп-листа
const createEventTypeList = (offers, id) => (
  offers.map(({type}) => `<div class="event__type-item">
      <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${type}</label>
    </div>`).join('')
);

const createAdditionalOffer = (checkedOffers, availableOffers, id, isDisabled) => {
  const getOffersChecked = (offerTitle) => checkedOffers
    .map(({title}) => title.toLowerCase())
    .includes(offerTitle.toLowerCase()) ? 'checked' : '' ;

  if (availableOffers.length) {
    return  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
    ${availableOffers.map(({title, price}) => `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" data-title="${title.toLowerCase()}" data-price="${price}" id="event-offer-${title}-${id}" type="checkbox" name="event-offer-${title}" ${getOffersChecked(title)} ${isDisabled? 'disabled' : ''}>
    <label class="event__offer-label" for="event-offer-${title}-${id}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`).join('')}
    </div>
  </section>`;
  }
  return '';
};

const NEW_EVENT = {
  type: 'taxi',
  basePrice: '',
  dateFrom: new Date(),
  dateTo: new Date(),
  offers: [],
  destination: {
    description: '',
    name: '',
    pictures: [],
  },
  isFavorite: false,
};

const createFormEventTemplate = (data, AllOffers, Alldestinations, isNewEvent) => {
  const {type, basePrice, dateFrom, dateTo, destination, offers, id, isDisabled, isSaving, isDeleting} = data;
  const availableOffersByType = AllOffers.find((offer) => offer.type === type.toLowerCase()).offers;
  const dateToInDateValue = dayjs(dateTo).format('DD/MM/YY HH:mm');
  const dateFromInDateValue = dayjs(dateFrom).format('DD/MM/YY HH:mm');
  const cityList = createCityList(Alldestinations);
  const eventTypeList = createEventTypeList(AllOffers ,id);

  const additionalOffers = createAdditionalOffer(offers, availableOffersByType, id, isDisabled);
  const destinationList = createDestinationTemplate(destination);
  const eventRollupButton = createEventRollupButtonTemplate(isNewEvent, isDisabled);
  const buttonText = createContentButton(isNewEvent, isDeleting);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event ${type} icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox" ${isDisabled? 'disabled' : ''}>

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          ${eventTypeList}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-${id}">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${id}" ${isDisabled? 'disabled' : ''}>
      <datalist id="destination-list-${id}">
        ${cityList}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${id}">From</label>
      <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${dateFromInDateValue}" ${isDisabled? 'disabled' : ''}>
      &mdash;
      <label class="visually-hidden" for="event-end-time-${id}">To</label>
      <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${dateToInDateValue}" ${isDisabled? 'disabled' : ''}>
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-${id}">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}" ${isDisabled? 'disabled' : ''}>
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled? 'disabled' : ''}>${isSaving? 'Saving...' : 'Save'}</button>
    <button class="event__reset-btn" type="reset" ${isDisabled? 'disabled' : ''}>${buttonText}</button>
    ${eventRollupButton}
  </header>
  <section class="event__details">
    ${additionalOffers}

    ${destinationList}
  </section>
</form>
</li>`;
};

export default class FormEvent extends Smart {
  constructor(data) {
    super();

    const {event = NEW_EVENT, offers, destinations} = data;
    this._data = FormEvent.parseEventToData(event);

    this._newEvent = !data.event;
    this._offers = offers;
    this._destinations = destinations;

    this._datepickerStart = null;
    this._datepickerEnd = null;

    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._submitClickHandler = this._submitClickHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._cityChangeHandler = this._cityChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._DateFromChangeHandler = this._DateFromChangeHandler.bind(this);
    this._DateToChangeHandler = this._DateToChangeHandler.bind(this);
    this._offersSelectedHandler = this._offersSelectedHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepickers();
  }

  getTemplate() {
    const isNewEvent = (this._newEvent);

    return createFormEventTemplate(this._data, this._offers, this._destinations, isNewEvent);
  }

  _typeChangeHandler(evt) {
    if (evt.target.tagName === 'INPUT') {
      this.updateData(
        {
          type: evt.target.value,
          offers: [],
        },
      );
    }
  }

  _cityChangeHandler(evt) {
    const inputValue = getFirstLetterInCapitalLetters(evt.target.value);
    const cityList = this._destinations.map((destination) => destination.name);
    const isCityExist = cityList.includes(inputValue);

    evt.preventDefault();
    if (inputValue.length <= 0 || isCityExist === false) {
      evt.target.setCustomValidity('The city must be from the droplist.');
    } else {
      evt.target.setCustomValidity('');
      this.updateData(
        {
          destination: {
            description: this._destinations.find((destination) => destination.name === inputValue).description,
            name: inputValue,
            pictures: this._destinations.find((destination) => destination.name === inputValue).pictures,
          },
        },
      );
    }
    evt.target.reportValidity();
  }

  _priceChangeHandler(evt) {
    const priceInput = evt.target.value;
    const isNotNumber = isNaN(priceInput);
    evt.preventDefault();
    if (priceInput <= 0 || isNotNumber) {
      evt.target.setCustomValidity('The number must be greater than zero.');
    } else {
      evt.target.setCustomValidity('');
      this.updateData(
        {
          basePrice: + evt.target.value,
        },
        true,
      );
    }
    evt.target.reportValidity();
  }

  _offersSelectedHandler(evt) {
    evt.preventDefault();
    const checkInputs = this.getElement().querySelectorAll('.event__offer-checkbox');
    const currentOffers = [];

    checkInputs.forEach((offer) => {
      if(offer.checked) {
        currentOffers.push({
          title: offer.dataset.title,
          price: Number(offer.dataset.price),
        });
      }
    });

    this.updateData({
      offers: currentOffers,
    });
  }

  removeElement() {
    super.removeElement();

    if (this._datepickerFrom) {
      this._datepickerFrom.destroy();
      this._datepickerFrom = null;
    }

    if(this._datepickerTo) {
      this._datepickerTo.destroy();
      this._datepickerTo = null;
    }
  }

  reset(event) {
    this.updateData(
      FormEvent.parseEventToData(event),
    );
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(FormEvent.parseDataToEvent(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;

    if (this.getElement().querySelector('.event__rollup-btn')) {
      this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._closeClickHandler);
    }
  }

  _setDatepickers() {
    this._setDatepickerFrom();
    this._setDatepickerTo();
  }

  _setDatepickerFrom() {
    this._datepickerFrom = flatpickr(
      this.getElement().querySelector('[name = "event-start-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._data.dateFrom,
        onChange: this._DateFromChangeHandler,
      },
    );
  }

  _setDatepickerTo() {
    this._datepickerTo = flatpickr(
      this.getElement().querySelector('[name = "event-end-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        minDate: this._data.dateFrom,
        defaultDate: this._data.dateTo,
        onChange: this._DateToChangeHandler,
      },
    );
  }

  _DateFromChangeHandler([userDate]) {
    this.updateData(
      {
        dateFrom: userDate,
      },
    );
  }

  _DateToChangeHandler([userDate]) {
    this.updateData(
      {
        dateTo: userDate,
      },
    );
  }

  _submitClickHandler(evt) {
    evt.preventDefault();
    formValidity(evt);

    if(evt.target.checkValidity()) {
      this._callback.submitClick(FormEvent.parseDataToEvent(this._data));
    }
  }

  setSubmitClickHandler(callback) {
    this._callback.submitClick = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._submitClickHandler);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-list').addEventListener('click', this._typeChangeHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._cityChangeHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('input', this._priceChangeHandler);
    this.getElement().querySelector('.event__section').addEventListener('change', this._offersSelectedHandler);
    if (this.getElement().querySelector('.event__rollup-btn')) {
      this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._closeClickHandler);
    }
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepickers();
    this.setSubmitClickHandler(this._callback.submitClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  static parseEventToData(event) {
    return Object.assign(
      {},
      event,
      {
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      },
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign(
      {},
      data,
    );

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}
