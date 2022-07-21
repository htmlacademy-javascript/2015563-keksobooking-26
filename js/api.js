import {showAlert} from './popup.js';

const API_URL = 'https://26.javascript.pages.academy/keksobooking';

const ERROR_GET_DATA = 'Не удалось загрузить объявления. Попробуйте еще раз';
const ERROR_SEND_DATA = 'Не удалось отправить форму. Попробуйте еще раз';

const getData = (onSuccess) => {
  fetch(`${API_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      showAlert(ERROR_GET_DATA);
    })
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(() => {
      showAlert(ERROR_GET_DATA);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(API_URL,
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail(ERROR_SEND_DATA);
      }
    })
    .catch(() => {
      onFail(ERROR_SEND_DATA);
    });
};

export {
  getData,
  sendData
};
