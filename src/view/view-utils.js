const renderTripPath = (places) => {
  let path = '';

  if(places.length > 3) {
    path = `${places[0]} — ... — ${places[places.length - 1]}`;
  } else {
    for(let i = 0; i < places.length; i++) {
      if (i === places.length - 1) {
        path += places[i];
      } else {
        path += `${places[i]} — `;
      }
    }
  }

  return path;
};

const formatOfferLabel = (string) => {
  const formatedStrind = (string.toLowerCase().replace(/[_, ]+/g, '-'));
  return formatedStrind;
};

const renderTypes = (types, id) => {
  let optionTypes = '';
  for(const type of types) {
    const template = `<div class="event__type-item">
      <input id="event-type-${type}-${id}" class="event__type-input visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label event__type-label--${type}" for="event-type-${type}-${id}">${type}</label>
    </div>`;
    optionTypes += template;
  }
  return optionTypes;
};

const renderDestinations = (towns) => {
  let destinations = '';

  for(const town of towns) {
    const template = `<option value="${town}"></option>`;
    destinations += template;
  }

  return destinations;
};

const renderOffers = (offers, id) => {
  if(offers.length) {
    const formOffers = offers.map((offer) => {
      const {title, price} = offer;
      const template = `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${formatOfferLabel(title)}-${id}" type="checkbox" name="event-offer-${formatOfferLabel(title)}-${id}" ${offer.isSelected ? 'checked=""' : ''}>
        <label class="event__offer-label" for="event-offer-${formatOfferLabel(title)}-${id}">
          <span class="event__offer-title">${title}</span>
          +€&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>`;
      return template;
    }).join('');
    const renderedOffers = `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${formOffers}
      </div>
    </section>`;
    return renderedOffers;
  } else {
    return '';
  }
};

const renderImages = (images) => {
  let outputImages = '';
  for(const image of images) {
    const {src, description} = image;
    const template = `<img class="event__photo" src="${src}" alt="${description}">`;
    outputImages += template;
  }
  return outputImages;
};

export {
  renderTypes,
  renderDestinations,
  renderOffers,
  renderImages,
  renderTripPath
};
