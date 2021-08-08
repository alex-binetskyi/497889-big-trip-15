import { getRandomInteger } from '../utils';

const generateEventOffers = (eventType) => {
  const eventOffers = {
    taxi: {
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
          'title': 'Drive quickly, I&quot;m in a hurry',
          'price': 70,
          'isSelected': Boolean(getRandomInteger(0, 1)),
        },
      ],
    },
    bus: {
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
    train: {
      offers: [
        {
          'title': 'Book a taxi at the arrival point-undefined',
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
    ship: {
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
    transport: {
      offers: [],
    },
    drive: {
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
    flight: {
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
    'check-in': {
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
    'sightseeing': {
      offers: [],
    },
    'restaurant': {
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
  };

  return eventOffers[eventType].offers;
};

export { generateEventOffers };
