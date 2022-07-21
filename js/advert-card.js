const typeDictionary = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  hotel: 'Отель',
  house: 'Дом',
  palace: 'Дворец',
};

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createRentOfferCard = (advert) => {
  const {author, offer} = advert;
  const cardElement = cardTemplate.cloneNode(true);
  const photoList = cardElement.querySelector('.popup__photos');
  const photoTemplate = cardElement.querySelector('.popup__photo');
  const descriptionElement = cardElement.querySelector('.popup__description');
  const featureContainer = cardElement.querySelector('.popup__features');
  const featureList = cardElement.querySelectorAll('.popup__feature');

  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  cardElement.querySelector('.popup__type').textContent = typeDictionary[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  if (offer.photos && offer.photos.length > 0) {
    photoList.innerHTML = '';
    offer.photos.forEach((photo) => {
      const photoElement = photoTemplate.cloneNode(true);
      photoElement.src = photo;
      photoList.appendChild(photoElement);
    });
  } else {
    photoList.remove();
  }

  if (offer.description) {
    descriptionElement.textContent = offer.description;
  } else {
    descriptionElement.remove();
  }

  if (offer.features && offer.features.length > 0) {
    featureList.forEach((featureElement) => {
      offer.features.some((feature) => featureElement.classList.contains(`popup__feature--${feature}`));
    });
  } else {
    featureContainer.remove();
  }

  return cardElement;
};

export {
  createRentOfferCard,
  typeDictionary
};
