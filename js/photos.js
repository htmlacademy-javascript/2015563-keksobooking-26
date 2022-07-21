const FILE_TYPES = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];

const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarChooserElement = document.querySelector('.ad-form__field [type="file"]');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const photoChooserElement = document.querySelector('.ad-form__upload [type="file"]');
const photoPreviewElement = document.querySelector('.ad-form__photo');

const isFile = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

avatarChooserElement.addEventListener('change', () => {
  const file = avatarChooserElement.files[0];

  if (isFile(file)) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
});

const createPreviewImage = (file) => {
  const previewImageElement = document.createElement('img');
  previewImageElement.src = URL.createObjectURL(file);
  previewImageElement.alt = 'Фотография жилья';
  previewImageElement.style.width = '100%';
  previewImageElement.style.height = '70';
  photoPreviewElement.append(previewImageElement);
};


const removePreviewImage = () => {
  if (photoPreviewElement.children.length > 0) {
    photoPreviewElement.children[0].remove();
  }
};

photoChooserElement.addEventListener('change', () => {
  removePreviewImage();
  const file = photoChooserElement.files[0];

  if (isFile(file)) {
    createPreviewImage(file);
  }
});

const resetPreviewFile = () => {
  photoPreviewElement.innerHTML = '';
  avatarPreviewElement.src = DEFAULT_AVATAR;
};

export {resetPreviewFile};
