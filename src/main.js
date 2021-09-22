import MenuView from './view/menu.js';
import TripInfoSectionView from './view/trip-info-section.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import StatsView from './view/stats.js';

import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';

import EventsModel from './model/events.js';
import FilterModel from './model/filter.js';

import {remove, render, RenderPosition } from './utils/render.js';
import {reducer} from './utils/common.js';
import {MenuItem, UpdateType} from './const.js';

import Api from './api.js';

const AUTHORIZATION = 'Basic slvsrvmk74knc';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';

const eventsModel = new EventsModel();
const filterModel = new FilterModel();

const siteMainElement = document.querySelector('.page-body__page-main .page-body__container');

const newEventBtnElement = document.querySelector('.trip-main__event-add-btn');
const siteControlsNavigation = document.querySelector('.trip-controls__navigation');
const siteTripControlsFilters = document.querySelector('.trip-controls__filters');
const siteTripEvents = document.querySelector('.trip-events');
const MenuComponent = new MenuView();

const api = new Api(END_POINT, AUTHORIZATION);

const trip = new TripPresenter(siteTripEvents, eventsModel, filterModel, api);
const filter = new FilterPresenter(siteTripControlsFilters, filterModel, eventsModel);

let statsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      MenuComponent.getElement().querySelector('#menu_table').classList.add('trip-tabs__btn--active');
      MenuComponent.getElement().querySelector('#menu_stats').classList.remove('trip-tabs__btn--active');
      trip.destroy();
      trip.init();
      remove(statsComponent);
      break;
    case MenuItem.STATS:
      MenuComponent.getElement().querySelector('#menu_stats').classList.add('trip-tabs__btn--active');
      MenuComponent.getElement().querySelector('#menu_table').classList.remove('trip-tabs__btn--active');
      trip.destroy();
      statsComponent = new StatsView(eventsModel.getEvents());
      render(siteMainElement, statsComponent, RenderPosition.BEFOREEND);
      break;
  }
};


newEventBtnElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  trip.createEvent();
});

filter.init();
trip.init();

api.getPoints()
  .then((events) => {
    eventsModel.setEvents(UpdateType.INIT, events);
    render(siteControlsNavigation, MenuComponent, RenderPosition.BEFOREEND);
    MenuComponent.setMenuClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    eventsModel.setEvents(UpdateType.INIT, []);
    render(siteControlsNavigation, MenuComponent, RenderPosition.BEFOREEND);
    MenuComponent.setMenuClickHandler(handleSiteMenuClick);
  });

// api.getPoints().then((points) => {
//   eventsModel.setEvents(points);
//   dataEvents = points.slice();

//   if(dataEvents.length > 0) {
//     const siteTripMain = document.querySelector('.trip-main');
//     render(siteTripMain, new TripInfoSectionView(), RenderPosition.AFTERBEGIN);
//     const siteTripInfoSection = document.querySelector('.trip-info');
//     const towns = dataEvents.map((event) => event['destination'].name);
//     const price = dataEvents.map((event) => event['basePrice']).reduce(reducer);
//     render(siteTripInfoSection, new TripInfoView(towns, dataEvents[0]['dateFrom'], dataEvents[dataEvents.length -1 ]['dateTo']), RenderPosition.BEFOREEND);
//     render(siteTripInfoSection, new TripCostView(price), RenderPosition.BEFOREEND);
//   }
// });

// export {dataEvents};
