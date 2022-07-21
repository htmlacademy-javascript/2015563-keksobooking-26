import {debounce} from './util.js';
import {clearMarkers, renderMarkers} from './map.js';

const DEFAULT_VALUE = 'any';
const OFFERS_COUNT = 10;
const PRICE_LEVEL = {
  any: {
    min: 0,
    max: 100000,
  },
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: 100000,
  },
};

const formFilterElement = document.querySelector('.map__filters');
const typeFilterElement = formFilterElement.querySelector('#housing-type');
const priceFilterElement = formFilterElement.querySelector('#housing-price');
const roomsFilterElement = formFilterElement.querySelector('#housing-rooms');
const guestsFilterElement = formFilterElement.querySelector('#housing-guests');
const featuresFilterElement = formFilterElement.querySelectorAll('.map__checkbox');

const filterByType = (offer) => typeFilterElement.value === DEFAULT_VALUE || offer.offer.type === typeFilterElement.value;
const filterByRooms = (offer) => roomsFilterElement.value === DEFAULT_VALUE || offer.offer.rooms === +roomsFilterElement.value;
const filterByGuests = (offer) => guestsFilterElement.value === DEFAULT_VALUE || offer.offer.guests === +guestsFilterElement.value;

const filterByPrice = (offer) =>
  offer.offer.price >= PRICE_LEVEL[priceFilterElement.value].min &&
  offer.offer.price < PRICE_LEVEL[priceFilterElement.value].max;

const filterByFeatures = (offer) => Array.from(featuresFilterElement).every((filterFeature) => {
  if (!filterFeature.checked) {
    return true;
  }
  if (!offer.offer.features) {
    return false;
  }
  return offer.offer.features.includes(filterFeature.value);
});

const filterOffers = (offers) => {
  const filteredOffers = [];

  for (const offer of offers) {
    if (filteredOffers.length >= OFFERS_COUNT) {
      break;
    }
    if (
      filterByType(offer) &&
      filterByRooms(offer) &&
      filterByPrice(offer) &&
      filterByGuests(offer) &&
      filterByFeatures(offer)
    ) {
      filteredOffers.push(offer);
    }
  }
  return filteredOffers;
};

const onFilterChange = (data) => {
  clearMarkers();
  const filteredMarkers = filterOffers(data);
  renderMarkers(filteredMarkers);
};

const setFilterListener = (data) => {
  formFilterElement.addEventListener('change', debounce(() => onFilterChange(data)));
  formFilterElement.addEventListener('reset', debounce(() => onFilterChange(data)));
};

export {setFilterListener};
