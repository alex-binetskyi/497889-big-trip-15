import { MOCK_EVENTS } from './mock/events';

import MenuView from './view/menu.js';
import TripInfoSectionView from './view/trip-info-section.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import TripFiltersView from './view/trip-filters.js';
import TripSortView from './view/trip-sort.js';
import TripEventsView from './view/trip-events';
// import FormCreateEventView from './view/form-create-event.js';
// import FormEditEventView from './view/form-edit-event.js';
import {renderElement, RenderPosition} from './utils.js';

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
renderElement(siteTripEvents, new TripEventsView(MOCK_EVENTS).getElement(), RenderPosition.BEFOREEND);
