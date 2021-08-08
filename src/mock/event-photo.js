import { getRandomInteger } from '../utils';
import { getRandomString } from '../utils';

const PHOTO_MAX = 6;
const PHOTO_MIN = 0;
const PHOTO_BASEURL = 'http://picsum.photos/248/152?r=';
const ALT = 'Lorem ipsum dolor sit amet consectetur adipiscing elit';

const generateEventPhotos = () => {
  const photoQuantity = getRandomInteger(PHOTO_MIN, PHOTO_MAX);
  const photos = [];
  for(let i = 0; i <= photoQuantity; i++) {
    const photo = {};
    photo.src = PHOTO_BASEURL + getRandomInteger(0, 1000);
    photo.description = getRandomString(ALT, ' ');
    photos.push(photo);
  }
  return photos;
};

export { generateEventPhotos };
