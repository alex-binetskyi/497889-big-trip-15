import Smart from './smart.js';
import { TYPES } from '../const';
import { TOWNS } from '../mock/event-destination';
import { renderTypes, renderDestinations, renderOffers } from './view-utils';
import { MOCK_EVENTS } from '../mock/events.js';
import { mathcTypeOffer } from '../utils/form';

const createFormEventTemplate = (event) => {
  const { basePrice: price, dateFrom: dateFrom, dateTo: dateTo, destination, id, offers, type } = event;
  const {description, name} = destination;
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
					<input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${dateFrom.format('YY/MM/DD HH:MM')}">
					&mdash;
					<label class="visually-hidden" for="event-end-time-${id}">To</label>
					<input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${dateTo.format('YY/MM/DD HH:MM')}">
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
				</section>
			</section>
		</form>
	</li>`;
};

export default class FormEvent extends Smart {
  constructor(event) {
    super();
    this._event = event;

    this._eventTypeSelectHandler = this._eventTypeSelectHandler.bind(this);

    this._editClickHandler = this._editClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formRemoveHandler = this._formRemoveHandler.bind(this);
  }

  getTemplate() {
    return createFormEventTemplate(this._event);
  }

  _eventTypeSelectHandler(evt) {
    evt.preventDefault();
    const value = evt.target.parentElement.querySelector('input').value;

    this.updateData({
      type: value,
      offers: mathcTypeOffer(value, MOCK_EVENTS),
    });
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._event);
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
    this.getElement().addEventListener('submit', this._formSubmitHandler);
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
