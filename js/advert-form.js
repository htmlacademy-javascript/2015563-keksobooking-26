import {toggleElements} from './util.js';
import {showSuccessMessage, showErrorMessage} from './popup.js';
import {sendData} from './api.js';
import {resetPreviewFile} from './photos.js';
import { resetMap } from './map.js';

const MIN_PRICE = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};

const MAX_PRICE = 100000;

const CAPACITY_OPTIONS = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const filterElement = document.querySelector('.map__filters');
const filterList = filterElement.querySelectorAll('.map__filters select, .map__filters fieldset');
const formElement = document.querySelector('.ad-form');
const formList = formElement.querySelectorAll('.ad-form fieldset');
const typeHousing = formElement.querySelector('#type');
const priceHousing = formElement.querySelector('#price');
const roomAmount = formElement.querySelector('#room_number');
const capacityAmount = formElement.querySelector('#capacity');
const timeElement = document.querySelector('.ad-form__element--time');
const timeList = timeElement.querySelectorAll('select');
const sliderElement = document.querySelector('.ad-form__slider');
const submitElement = document.querySelector('.ad-form__submit');
const resetButton = document.querySelector('.ad-form__reset');


const deactivatePage = () => {
  filterElement.classList.add('map__filters--disabled');
  toggleElements(filterList, true);
  formElement.classList.add('ad-form--disabled');
  toggleElements(formList, true);
};

const activateFilters = () => {
  filterElement.classList.remove('map__filters--disabled');
  toggleElements(filterList, false);
};

const activateForm = () => {
  formElement.classList.remove('ad-form--disabled');
  toggleElements(formList, false);
};

const validatePrice = (value) => parseInt(value, 10) >= MIN_PRICE[typeHousing.value];
const getMinPriceMessage = () => `Минимальная цена ${MIN_PRICE[typeHousing.value]}`;

const validateCapacity = () => CAPACITY_OPTIONS[roomAmount.value].includes(+capacityAmount.value);
const getCapacityMessage = () => {
  if (+roomAmount.value === 100) {
    return 'Комнаты не для гостей';
  } else if (+capacityAmount.value > +roomAmount.value) {
    return 'Гостей не больше, чем комнат';
  }
};

const onTimeChange = (evt) => {
  timeList.forEach((timeChange) => {
    timeChange.value = evt.target.value;
  });
};

const onTypeHousingChange = () => {
  priceHousing.placeholder = MIN_PRICE[typeHousing.value];
  priceHousing.min = MIN_PRICE[typeHousing.value];
};

const setSubmitButtonState = (value) => {
  submitElement.disabled = value;
};

const onSendSuccess = () => {
  showSuccessMessage();
  formElement.reset();
  filterElement.reset();
  resetPreviewFile();
  resetMap();
  setSubmitButtonState(false);
};

const onSendFailure = () => {
  showErrorMessage();
  setSubmitButtonState(false);
};

const initValidation = () => {
  const pristine = new Pristine(formElement, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorTextClass: 'ad-form__error',
  }, false);

  pristine.addValidator(priceHousing, validatePrice, getMinPriceMessage);
  pristine.addValidator(roomAmount, validateCapacity, getCapacityMessage);
  pristine.addValidator(capacityAmount, validateCapacity, getCapacityMessage);

  timeElement.addEventListener('change', onTimeChange);
  typeHousing.addEventListener('change', onTypeHousingChange);

  resetButton.addEventListener('click', () => {
    filterElement.reset();
    resetMap();
  });

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      setSubmitButtonState(true);
      sendData(onSendSuccess, onSendFailure, new FormData(evt.target));
    }
  });
};

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: MAX_PRICE,
    },
    start: MIN_PRICE[typeHousing.value],
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed(0),
      from: (value) => parseFloat(value),
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    priceHousing.value = sliderElement.noUiSlider.get();
  });

  priceHousing.addEventListener('change', (evt) => {
    sliderElement.noUiSlider.set(evt.target.value);
  });
};

export {
  deactivatePage,
  activateFilters,
  activateForm,
  initValidation,
  createSlider
};
