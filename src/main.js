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
import {render, RenderPosition} from './utils.js';

const siteTripMain = document.querySelector('.trip-main');
render(siteTripMain, new TripInfoSectionView().getElement(), RenderPosition.AFTERBEGIN);

const siteTripInfoSection = document.querySelector('.trip-info');
render(siteTripInfoSection, new TripInfoView().getElement(), RenderPosition.BEFOREEND);
render(siteTripInfoSection, new TripCostView().getElement(), RenderPosition.BEFOREEND);

const siteTripControlsSection = document.querySelector('.trip-controls');
render(siteTripControlsSection, new MenuView().getElement(), RenderPosition.BEFOREEND);
render(siteTripControlsSection, new TripFiltersView().getElement(), RenderPosition.BEFOREEND);

const siteTripEvents = document.querySelector('.trip-events');
render(siteTripEvents, new TripSortView().getElement(), RenderPosition.BEFOREEND);


const renderPoint = (pointListElement, point) => {
  const pointComponent = new TripEventView(point);
  const pointEditComponent = new FormEditEventView(point);
  const showFormButton = pointComponent.getElement().querySelector('.event__rollup-btn');
  const hideFormButton = pointEditComponent.getElement().querySelector('.event__rollup-btn');

  const replaceEventToForm = () => {
    pointListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToEvent = () => {
    pointListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  showFormButton.addEventListener('click', () => {
    replaceEventToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  hideFormButton.addEventListener('click', () => {
    replaceFormToEvent();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.getElement().addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToEvent();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(pointListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

const eventsListComponent = new TripEventListView();
render(siteTripEvents, eventsListComponent.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < MOCK_EVENTS.length; i++) {
  renderPoint(eventsListComponent.getElement(), MOCK_EVENTS[i]);
}

if(MOCK_EVENTS.length === 0) {
  render(siteTripEvents, new TripEventListEmptyView().getElement(), RenderPosition.BEFOREEND);
}

