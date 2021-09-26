import AbstractView from './abstract';
import dayjs from 'dayjs';

const datePerMonth = 'MMM';
const datePerDay = 'DD';
const datePerMonthAdnDay = 'MMM DD';

const showWay = (events) => {
  if (events.length >= 4) {
    return `${events[0].destination.name} — ... — ${events[events.length -1].destination.name}`;
  }
  return events.map((event) => event.destination.name).join(' — ');
};

const showDate = (events) => {
  const startData = events[0].dateFrom;
  const endData = events[events.length - 1].dateTo;

  const startMonth = dayjs(startData).format(datePerMonth);
  const endMonth = dayjs(endData).format(datePerMonth);

  const isOneMonth = startMonth === endMonth ? datePerDay : datePerMonthAdnDay;

  return `${dayjs(startData).format(datePerMonthAdnDay)} — ${dayjs(endData).format(isOneMonth)}`;
};

const getTotalPrice = (events) => events.reduce((sumEvents, event) => {
  const totalOffersPrice = event.offers.reduce((sumOffers, {price}) => sumOffers + price, 0);
  return sumEvents + event.basePrice + totalOffersPrice;
}, 0);

const createRouteAndPriceTemplate = (events) => {
  const way = showWay(events);
  const data = showDate(events);
  const totalPrice = getTotalPrice(events);

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${way}</h1>

    <p class="trip-info__dates">${data}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>
</section>`;
};

export default class RouteAndPrice extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createRouteAndPriceTemplate(this._events);
  }
}
