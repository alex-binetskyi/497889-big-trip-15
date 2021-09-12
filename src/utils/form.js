export const mathcTypeOffer = (type, offers) => {
  const match = offers.find((offer) => type === offer.type).offers;
  return match.offers;
};
