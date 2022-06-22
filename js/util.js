const getRandomPositiveInteger = (a, b) => {   //Функция генерации положительного числа
  if (a < 0 || b <= a) {
    throw new RangeError ('Диапазон может быть только положительный, включая ноль. Введите корректный диапазон чисел');
  }
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomFloat = (min, max, digits = 5) => {   //Функция генерации положительного числа с плавающей точкой
  if (min < 0 || max <= min) {
    throw new RangeError ('Диапазон может быть только положительный, включая ноль. Введите корректный диапазон чисел');
  }
  return +(Math.random() * (max - min) + min).toFixed(digits); //Максимум и минимум включаются
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];   //Функция генерации элемента из массива

const getShuffledArray = (elements) => {   //Функция перемешивания и генерации нового массива
  const newArray = elements.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export {
  getRandomPositiveInteger,
  getRandomFloat,
  getRandomArrayElement,
  getShuffledArray,
};
