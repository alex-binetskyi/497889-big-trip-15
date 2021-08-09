import {createMenuTemplate} from './view/menu.js';
import {createTripInfoSectionTemplate} from './view/trip-info-section.js';
import {createTripInfoTemplate} from './view/trip-info.js';
import {createTripCostTemplate} from './view/trip-cost.js';
import {createTripFiltersTemplate} from './view/trip-filters.js';
import {createTripSortTemplate} from './view/trip-sort.js';
import {createTripEventListTemplate} from './view/trip-events-list.js';
// import {createFormEditEventTemplate} from './view/form-edit-event.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteTripMain = document.querySelector('.trip-main');
render(siteTripMain, createTripInfoSectionTemplate(), 'afterbegin');
const siteTripInfoSection = document.querySelector('.trip-info');
render(siteTripInfoSection, createTripInfoTemplate(), 'beforeend');
render(siteTripInfoSection, createTripCostTemplate(), 'beforeend');
const siteTripControlsSection = document.querySelector('.trip-controls');
render(siteTripControlsSection, createMenuTemplate(), 'beforeend');
render(siteTripControlsSection, createTripFiltersTemplate(), 'beforeend');
const siteTripEvents = document.querySelector('.trip-events');
render(siteTripEvents, createTripSortTemplate(), 'beforeend');
render(siteTripEvents, createTripEventListTemplate(), 'beforeend');
