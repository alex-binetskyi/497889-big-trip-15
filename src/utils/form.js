export const matchTypeOffers = (type, eventOffers) => {
  const match = eventOffers.find((offer) => type === offer.type).offers;
  return match;
};

export const matchCity = (cityValue, cities) => {
  const match = cities.find((city) => cityValue === city.name);
  return match;
};
