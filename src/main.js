import { MOCK_EVENTS } from './mock/events.js';

import MenuView from './view/menu.js';
import TripInfoSectionView from './view/trip-info-section.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import TripFiltersView from './view/trip-filters.js';
import Trip from './presenter/trip.js';

import {render, RenderPosition } from './utils/render.js';
import {reducer} from './utils/common.js';

const siteTripControlsNavigation = document.querySelector('.trip-controls__navigation');
render(siteTripControlsNavigation, new MenuView(), RenderPosition.BEFOREEND);
const siteTripControlsFilters = document.querySelector('.trip-controls__filters');
render(siteTripControlsFilters, new TripFiltersView(), RenderPosition.BEFOREEND);

const siteTripEvents = document.querySelector('.trip-events');

if(MOCK_EVENTS.length) {
  const siteTripMain = document.querySelector('.trip-main');
  render(siteTripMain, new TripInfoSectionView(), RenderPosition.AFTERBEGIN);
  const siteTripInfoSection = document.querySelector('.trip-info');
  const towns = MOCK_EVENTS.map((event) => event['destination'].name);
  const price = MOCK_EVENTS.map((event) => event['base_price']).reduce(reducer);
  render(siteTripInfoSection, new TripInfoView(towns, MOCK_EVENTS[0]['date_from'], MOCK_EVENTS[MOCK_EVENTS.length -1 ]['date_to']), RenderPosition.BEFOREEND);
  render(siteTripInfoSection, new TripCostView(price), RenderPosition.BEFOREEND);
}

const trip = new Trip(siteTripEvents);

trip.init(MOCK_EVENTS);
