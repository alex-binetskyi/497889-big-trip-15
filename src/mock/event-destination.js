import { getRandomInteger, getRandomString } from '../utils';
import { generateEventPhotos } from './event-photo';

const TOWNS = ['Cairo', 'McMurdo', 'Tokyo', 'Dublin', 'Rio de Janeiro', 'Venice', 'Paris', 'Tbilisi', 'Sydney', 'Chernobyl'];
const DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const generateEventDestination = () => {
  const destination =  {
    'description': getRandomString(DESCRIPTION, '. '),
    'name': TOWNS[getRandomInteger(0, TOWNS.length - 1)],
    'pictures': generateEventPhotos(),
  };

  return destination;
};


export {
  generateEventDestination,
  TOWNS
};
