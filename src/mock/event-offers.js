import { getRandomInteger } from '../utils/common';

const eventOffers = [
  {
    type: 'taxi',
    offers: [
      {
        'title': 'Silent in car',
        'price': 30,
        'isSelected': Boolean(getRandomInteger(0, 1)),
      },
      {
        'title': 'Choose the radio station',
        'price': 30,
        'isSelected': Boolean(getRandomInteger(0, 1)),
      },
      {
        'title': 'Drive quickly, I am in a hurry',
        'price': 70,
        'isSelected': Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        'title': 'Choose seats',
        'price': 30,
        'isSelected': Boolean(getRandomInteger(0, 1)),
      },
      {
        'title': 'Infotainment system',
        'price': 40,
        'isSelected': Boolean(getRandomInteger(0, 1)),
      },
      {
        'title': 'Order meal',
        'price': 70,
        'isSelected': Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    type: 'train',
    offers: [
      {
        'title': 'Book a taxi at the arrival to point',
        'price': 100,
        'isSelected': Boolean(getRandomInteger(0, 1)),
      },
      {
        'title': 'Order meal',
        'price': 60,
        'isSelected': Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    type: 'ship',
    offers: [
      {
        'title': 'Choose meal',
        'price': 50,
        'isSelected': Boolean(getRandomInteger(0, 1)),
      },
      {
        'title': 'Choose seats',
        'price': 80,
        'isSelected': Boolean(getRandomInteger(0, 1)),
      },
      {
        'title': 'Upgrade to comfort class',
        'price': 110,
        'isSelected': Boolean(getRandomInteger(0, 1)),
      },
      {
        'title': 'Upgrade to businnes class',
        'price': 150,
        'isSelected': Boolean(getRandomInteger(0, 1)),
      },
      {
        'title': 'Add luggage',
        'price': 100,
        'isSelected': Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    type: 'transport',
    offers: [],
  },
  {
    type: 'drive',
    offers: [
      {
        'title': 'Choose premium class car',
        'price': 100,
        'isSelected': Boolean(getRandomInteger(0, 1)),
      },
      {
        'title': 'Insurance for all cases',
        'price': 200,
        'isSelected': Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    type: 'flight',
    offers: [
      {
        'title': 'Choose meal',
        'price': 50,
        'isSelected': Boolean(getRandomInteger(0, 1)),
      },
      {
        'title': 'Choose seats',
        'price': 40,
        'isSelected': Boolean(getRandomInteger(0, 1)),
      },
      {
        'title': 'Upgrade to comfort class',
        'price': 110,
        'isSelected': Boolean(getRandomInteger(0, 1)),
      },
      {
        'title': 'Upgrade to businnes class',
        'price': 150,
        'isSelected': Boolean(getRandomInteger(0, 1)),
      },
      {
        'title': 'Add luggage',
        'price': 100,
        'isSelected': Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    type: 'check-in',
    offers: [
      {
        'title': 'Add breakfas',
        'price': 50,
        'isSelected': Boolean(getRandomInteger(0, 1)),
      },
      {
        'title': 'Order a meal from the restaurant',
        'price': 40,
        'isSelected': Boolean(getRandomInteger(0, 1)),
      },
      {
        'title': 'Non-standard time for check-in/ou',
        'price': 70,
        'isSelected': Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
  {
    type: 'sightseeing',
    offers: [],
  },
  {
    type: 'restaurant',
    offers: [
      {
        'title': 'Choose live music',
        'price': 150,
        'isSelected': Boolean(getRandomInteger(0, 1)),
      },
      {
        'title': 'Choose VIP area',
        'price': 70,
        'isSelected': Boolean(getRandomInteger(0, 1)),
      },
    ],
  },
];

export { eventOffers };
