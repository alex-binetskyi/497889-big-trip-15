import { TYPES } from '../const';
import { TOWNS } from '../mock/event-destination';
import { renderTypes, renderDestinations, renderOffers } from './view-utils';
import {createElement} from '../utils.js';

const createFormEditEventTemplate = (event) => {
  const { base_price: price, date_from: dateFrom, date_to: dateTo, destination, id, offers, type } = event;
  const {description, name} = destination;
  return = `<li class="trip-events__item">
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

export default class FormEditEvent {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createFormEditEventTemplate(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
