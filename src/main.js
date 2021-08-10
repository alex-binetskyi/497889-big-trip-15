import MenuView from './view/menu.js';
import TripInfoSectionView from './view/trip-info-section.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import TripFiltersView from './view/trip-filters.js';
import TripSortView from './view/trip-sort.js';

import TripEventListView from './view/trip-events-list.js';
// import {createFormEditEventTemplate} from './view/form-edit-event.js';
import {renderTemplate, renderElement, RenderPosition} from './utils.js';

const siteTripMain = document.querySelector('.trip-main');
renderElement(siteTripMain, new TripInfoSectionView().getElement(), RenderPosition.AFTERBEGIN);

const siteTripInfoSection = document.querySelector('.trip-info');
renderElement(siteTripInfoSection, new TripInfoView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteTripInfoSection, new TripCostView().getElement(), RenderPosition.BEFOREEND);

const siteTripControlsSection = document.querySelector('.trip-controls');
renderElement(siteTripControlsSection, new MenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteTripControlsSection, new TripFiltersView().getElement(), RenderPosition.BEFOREEND);

const siteTripEvents = document.querySelector('.trip-events');
renderElement(siteTripEvents, new TripSortView().getElement(), RenderPosition.BEFOREEND);
renderTemplate(siteTripEvents, new TripEventListView().getTemplate(), RenderPosition.BEFOREEND);
