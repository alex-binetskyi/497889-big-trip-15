import { formatDate } from '../utils';
import { TYPES } from '../mock/events';
import { TOWNS } from '../mock/event-destination';
import { renderTypes } from '../utils';
import { renderDestinations } from '../utils';
import { renderOffers } from '../utils';
import { renderImages } from '../utils';


const createFormCreateEventTemplate = (event) => {
  const { base_price: price, date_from: dateFrom, date_to: dateTo, destination, id, offers, type } = event;
  const {description, name, pictures} = destination;
  const formEventTemplate = `<li class="trip-events__item">
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
					<input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${formatDate(dateFrom, 'YY/MM/DD HH:MM')}">
					—
					<label class="visually-hidden" for="event-end-time-${id}">To</label>
					<input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${formatDate(dateTo, 'YY/MM/DD HH:MM')}">
				</div>

				<div class="event__field-group  event__field-group--price">
					<label class="event__label" for="event-price-${id}">
						<span class="visually-hidden">Price</span>
						€
					</label>
					<input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${price}">
				</div>

				<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
				<button class="event__reset-btn" type="reset">Cancel</button>
			</header>
			<section class="event__details">
				${renderOffers(offers, id)}

				<section class="event__section  event__section--destination">
					<h3 class="event__section-title  event__section-title--destination">Destination</h3>
					<p class="event__destination-description">${description}</p>

					<div class="event__photos-container">
						<div class="event__photos-tape">
              ${renderImages(pictures)}
						</div>
					</div>
				</section>
			</section>
		</form>
	</li>`;

  return formEventTemplate;
};


export { createFormCreateEventTemplate };
