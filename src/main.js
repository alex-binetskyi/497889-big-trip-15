import { MOCK_EVENTS } from './mock/events.js';

import MenuView from './view/menu.js';
import TripInfoSectionView from './view/trip-info-section.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import TripFiltersView from './view/trip-filters.js';
import TripSortView from './view/trip-sort.js';
import TripEventListView from './view/trip-events-list.js';
import TripEventListEmptyView from './view/trip-events-list-empty.js';
import TripEventView from './view/trip-event.js';
// import FormCreateEventView from './view/form-create-event.js';
import FormEditEventView from './view/form-edit-event.js';
import {render, RenderPosition, replace} from './utils/render.js';
import {reducer} from './utils/common.js';

const siteTripControlsSection = document.querySelector('.trip-controls');
render(siteTripControlsSection, new MenuView(), RenderPosition.BEFOREEND);
render(siteTripControlsSection, new TripFiltersView(), RenderPosition.BEFOREEND);


const renderPoint = (pointListElement, point) => {
  const pointComponent = new TripEventView(point);
  const pointEditComponent = new FormEditEventView(point);

  const replaceEventToForm = () => {
    replace(pointEditComponent, pointComponent);
  };

  const replaceFormToEvent = () => {
    replace(pointComponent, pointEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.setOnButtonClick(() => {
    replaceEventToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setOnButtonClick(() => {
    replaceFormToEvent();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setOnFormSubmit(() => {
    replaceFormToEvent();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(pointListElement, pointComponent, RenderPosition.BEFOREEND);
};

const siteTripEvents = document.querySelector('.trip-events');


if(MOCK_EVENTS.length) {
  const siteTripMain = document.querySelector('.trip-main');
  render(siteTripMain, new TripInfoSectionView(), RenderPosition.AFTERBEGIN);
  const siteTripInfoSection = document.querySelector('.trip-info');
  const towns = MOCK_EVENTS.map((event) => event['destination'].name);
  const price = MOCK_EVENTS.map((event) => event['base_price']).reduce(reducer);
  render(siteTripInfoSection, new TripInfoView(towns, MOCK_EVENTS[0]['date_from'], MOCK_EVENTS[MOCK_EVENTS.length -1 ]['date_to']), RenderPosition.BEFOREEND);
  render(siteTripInfoSection, new TripCostView(price), RenderPosition.BEFOREEND);

  render(siteTripEvents, new TripSortView(), RenderPosition.BEFOREEND);
  const eventsListComponent = new TripEventListView();
  render(siteTripEvents, eventsListComponent, RenderPosition.BEFOREEND);

  for (let i = 0; i < MOCK_EVENTS.length; i++) {
    renderPoint(eventsListComponent, MOCK_EVENTS[i]);
  }
} else {
  render(siteTripEvents, new TripEventListEmptyView(), RenderPosition.BEFOREEND);
}
