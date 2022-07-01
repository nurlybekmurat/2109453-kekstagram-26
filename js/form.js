import { checkStringLength } from './util.js';

const HASHTAG_REGEX = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const HASHTAG_QUANTITY_MAX = 5;
const HASHTAG_LENGTH_MAX = 20;
const DESCRIPTION_MAX = 140;

const formElement = document.querySelector('#upload-select-image');
const uploadButtonElement = document.querySelector('#upload-file');
const closeButtonElement = document.querySelector('#upload-cancel');
const overlay = document.querySelector('.img-upload__overlay');
const hashtagInputElement = document.querySelector('.text__hashtags');
const textDescriptionElement = document.querySelector('.text__description');

const errorMessages = {
  accuracy:
    'строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.',
  quantity: 'нельзя указать больше пяти хэш-тегов',
  uniqueness: 'один и тот же хэш-тег не может быть использован дважды',
  hashtagLength:
    'максимальная длина одного хэш-тега 20 символов, включая решётку',
  descriptionLength:
    'длина комментария не может составлять больше 140 символов',
};

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

const getHashtags = (array) =>
  array
    .toLowerCase()
    .split(' ')
    .filter((item) => item !== '');

const checkAccuracy = (array) => {
  const hashtags = getHashtags(array);
  return hashtags.every((item) => HASHTAG_REGEX.test(item));
};

const checkQuantity = (array) => {
  if (getHashtags(array).length <= HASHTAG_QUANTITY_MAX) {
    return true;
  }
  return false;
};

const checkUniqueness = (array) => {
  const hashtags = getHashtags(array);
  const uniques = new Set(hashtags);
  return hashtags.length === uniques.size;
};

const checkHashtagLength = (array) => {
  const hashtags = getHashtags(array);
  return hashtags.every((item) => checkStringLength(item, HASHTAG_LENGTH_MAX));
};

const checkLengthDescription = (array) =>
  checkStringLength(array, DESCRIPTION_MAX);

pristine.addValidator(
  hashtagInputElement,
  checkAccuracy,
  errorMessages.accuracy,
  false
);

pristine.addValidator(
  hashtagInputElement,
  checkQuantity,
  errorMessages.quantity,
  false
);

pristine.addValidator(
  hashtagInputElement,
  checkUniqueness,
  errorMessages.uniqueness,
  false
);

pristine.addValidator(
  hashtagInputElement,
  checkHashtagLength,
  errorMessages.hashtagLength
);

pristine.addValidator(
  textDescriptionElement,
  checkLengthDescription,
  errorMessages.descriptionLength
);

const validateForm = (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
};

const closeForm = (evt) => {
  if (
    hashtagInputElement === document.activeElement ||
    textDescriptionElement === document.activeElement
  ) {
    evt.stopPropagation();
  } else if (evt.key === 'Escape' || evt.target === closeButtonElement) {
    overlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadButtonElement.value = '';
  }
};

const showForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButtonElement.addEventListener('click', closeForm);
  document.addEventListener('keydown', closeForm);
  formElement.addEventListener('submit', validateForm);
};

uploadButtonElement.addEventListener('change', showForm);
