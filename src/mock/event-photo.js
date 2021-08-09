import { getRandomInteger, getRandomString } from '../utils';

const Picture = {
  MAX: 6,
  MIN: 0,
  BASEURL: 'http://picsum.photos/248/152?r=',
  ALT: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
};

const generateEventPhotos = () => {
  const photoQuantity = getRandomInteger(Picture.MIN, Picture.MAX);
  const photos = [];
  for(let i = 0; i <= photoQuantity; i++) {
    const photo = {};
    photo.src = Picture.BASEURL + getRandomInteger(0, 1000);
    photo.description = getRandomString(Picture.ALT, ' ');
    photos.push(photo);
  }
  return photos;
};

export { generateEventPhotos };
