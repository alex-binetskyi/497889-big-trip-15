import MenuView from './view/menu.js';
import StatsView from './view/stats.js';

import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';

import DestinationModel from './model/destination.js';
import EventsModel from './model/events.js';
import FilterModel from './model/filter.js';
import OffersModel from './model/offers.js';

import {remove, render, RenderPosition } from './utils/render.js';
import {MenuItem, UpdateType} from './const.js';

import Api from './api.js';

const AUTHORIZATION = 'Basic dk43453lcdsgrd';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';

const api = new Api(END_POINT, AUTHORIZATION);


const destinationsModel = new DestinationModel();
const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const offersModel = new OffersModel();

const siteMainContainerElement = document.querySelector('.page-body__page-main .page-body__container');
const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = document.querySelector('.page-header');
const siteTripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteMenuContainer = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteTripEventsElement = siteMainElement.querySelector('.trip-events');
const newEventButtonElement = siteHeaderElement.querySelector('.trip-main__event-add-btn');

const MenuComponent = new MenuView(eventsModel.getEvents());
render(siteMenuContainer, MenuComponent, RenderPosition.BEFOREEND);

newEventButtonElement.disabled = true;
const handlePointNewFormClose = () => {
  newEventButtonElement.disabled = false;
};

const filter = new FilterPresenter(siteFiltersElement, filterModel, eventsModel);
const trip = new TripPresenter(siteTripEventsElement, siteTripMainElement, eventsModel, filterModel, offersModel, destinationsModel, api);

let statsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      remove(statsComponent);
      trip.destroy();
      trip.init();
      newEventButtonElement.disabled = false;
      filter.init();
      MenuComponent.setMenuItem(MenuItem.TABLE);
      break;
    case MenuItem.STATS:
      trip.destroy();
      trip.renderTripInfo(eventsModel.getEvents());
      MenuComponent.setMenuItem(MenuItem.STATS);
      newEventButtonElement.disabled = true;
      document.querySelectorAll('.trip-filters__filter-input').forEach((filterItem) => filterItem.disabled = true);

      statsComponent = new StatsView(eventsModel.getEvents());
      render(siteMainContainerElement, statsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

MenuComponent.setMenuClickHandler(handleSiteMenuClick);
trip.init();

newEventButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  newEventButtonElement.disabled = true;
  trip.createEvent(handlePointNewFormClose);
});

Promise.all([
  api.getDestinations(),
  api.getOffers(),
  api.getEvents(),
])
  .then((values) => {
    const [destinations, offers, events] = values;
    destinationsModel.setDestinations(UpdateType.INIT, destinations);
    offersModel.setOffers(UpdateType.INIT, offers);
    eventsModel.setEvents(UpdateType.INIT, events);
    newEventButtonElement.disabled = false;
  })
  .catch(() => {
    eventsModel.setEvents(UpdateType.INIT, []);
  });

