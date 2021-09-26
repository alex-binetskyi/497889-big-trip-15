import AbstractObserver from '../utils/abstract-observer';

export default class Offers extends AbstractObserver {
  constructor() {
    super();
    this._offers = [];
  }

  setOffers(updateType, offers) {
    this._offers = offers;

    this._notify(updateType, offers);
  }

  getOffers() {
    return this._offers;
  }
}
