import { MOCK_EVENTS } from './mock/events.js';

import MenuView from './view/menu.js';
import TripInfoSectionView from './view/trip-info-section.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import EventsModel from './model/events.js';
import FilterModel from './model/filter.js';

import {render, RenderPosition } from './utils/render.js';
import {reducer} from './utils/common.js';

const events = MOCK_EVENTS;
const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

const siteTripControlsNavigation = document.querySelector('.trip-controls__navigation');
render(siteTripControlsNavigation, new MenuView(), RenderPosition.BEFOREEND);
const siteTripControlsFilters = document.querySelector('.trip-controls__filters');

const siteTripEvents = document.querySelector('.trip-events');

if(events.length) {
  const siteTripMain = document.querySelector('.trip-main');
  render(siteTripMain, new TripInfoSectionView(), RenderPosition.AFTERBEGIN);
  const siteTripInfoSection = document.querySelector('.trip-info');
  const towns = events.map((event) => event['destination'].name);
  const price = events.map((event) => event['basePrice']).reduce(reducer);
  render(siteTripInfoSection, new TripInfoView(towns, events[0]['dateFrom'], events[events.length -1 ]['dateTo']), RenderPosition.BEFOREEND);
  render(siteTripInfoSection, new TripCostView(price), RenderPosition.BEFOREEND);
}

const trip = new TripPresenter(siteTripEvents, eventsModel, filterModel);
const filter = new FilterPresenter(siteTripControlsFilters, filterModel, eventsModel);

trip.init();
filter.init();
