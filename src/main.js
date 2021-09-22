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
import {MenuItem} from './const.js';

import Api from './api.js';

const AUTHORIZATION = 'Basic slvsrvmk74knc';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';

const eventsModel = new EventsModel();
const filterModel = new FilterModel();

const api = new Api(END_POINT, AUTHORIZATION);

let dataEvents = null;

const MenuComponent = new MenuView();
const siteMainElement = document.querySelector('.page-body__page-main .page-body__container');
const newEventBtnElement = document.querySelector('.trip-main__event-add-btn');
let statsComponent = new StatsView();
const siteControlsNavigation = document.querySelector('.trip-controls__navigation');
render(siteControlsNavigation, MenuComponent, RenderPosition.BEFOREEND);
const siteTripControlsFilters = document.querySelector('.trip-controls__filters');
const siteTripEvents = document.querySelector('.trip-events');

api.getPoints().then((points) => {
  eventsModel.setEvents(points);
  dataEvents = points.slice();

  if(dataEvents.length > 0) {
    const siteTripMain = document.querySelector('.trip-main');
    render(siteTripMain, new TripInfoSectionView(), RenderPosition.AFTERBEGIN);
    const siteTripInfoSection = document.querySelector('.trip-info');
    const towns = dataEvents.map((event) => event['destination'].name);
    const price = dataEvents.map((event) => event['basePrice']).reduce(reducer);
    render(siteTripInfoSection, new TripInfoView(towns, dataEvents[0]['dateFrom'], dataEvents[dataEvents.length -1 ]['dateTo']), RenderPosition.BEFOREEND);
    render(siteTripInfoSection, new TripCostView(price), RenderPosition.BEFOREEND);
  }

  const trip = new TripPresenter(siteTripEvents, eventsModel, filterModel);
  const filter = new FilterPresenter(siteTripControlsFilters, filterModel, eventsModel);

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
        statsComponent = new StatsView(dataEvents);
        render(siteMainElement, statsComponent, RenderPosition.BEFOREEND);
        break;
    }
  };

  MenuComponent.setMenuClickHandler(handleSiteMenuClick);

  newEventBtnElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    trip.createEvent();
  });

  filter.init();
  trip.init();
});

export {dataEvents};
