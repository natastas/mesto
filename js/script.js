import { FormValidator } from "./FormValidator.js";

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validationConfig = ({
  formSelector: '.popup__body',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_notactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});

const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileOpenButton = document.querySelector('.profile__button-edit');
const popupProfileCloseButton = document.querySelector('.popup__close');
const names = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');
const popupPlace = document.querySelector('.popup_type_card-add');
const popupPlaceOpenButton = document.querySelector('.profile__button-add');
const popupPlaceCloseButton = document.querySelector('.popup__close_type_card-add');
const template = document.querySelector('.template-place').content;
const box = document.querySelector('.places__box');
const popupImage = document.querySelector('.popup_type_picture');
const popupPhoto = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__subtitle');
const popupImageCloseButton = document.querySelector('.popup__close_type_picture');
const inputPlace = document.querySelector('.popup__input-place');
const inputLink = document.querySelector('.popup__input-link');
const inputJob = document.querySelector('.popup__input-job');
const inputName = document.querySelector('.popup__input-name');
const formElementAdd = document.querySelector('.popup__body_type_card-add');
const cardValidator = new FormValidator(validationConfig, formElementAdd);
const formElementProfile = document.querySelector('.popup__body_type_profile');
const profileValidator = new FormValidator(validationConfig, formElementProfile);

initialCards.forEach(renderCard);

function renderCard(cardItem) {
  box.prepend(createCard(cardItem));
};
 
function createCard(cardItem){
  const newItem = template.cloneNode(true);
  const newImage = newItem.querySelector('.place__image');
  newItem.querySelector('.place__subtitle').textContent = cardItem.name;
  newImage.src = cardItem.link;
  newImage.alt = cardItem.name;
  newItem.querySelector('.place__heart').addEventListener('click', function(event) {
    event.target.classList.toggle('place__heart_active');
  });
  newItem.querySelector('.place__delete').addEventListener('click', function(event) {
    event.target.closest('.place').remove();
  });
  newItem.querySelector('.place__image').addEventListener('click', function (openPopupImage) {
    openPopup (popupImage);
    popupPhoto.src = cardItem.link;
    popupPhoto.alt = cardItem.name;
    popupTitle.textContent = cardItem.name;
  });
  return newItem;
};

function addCard(event) {
  event.preventDefault();
  renderCard({name: inputPlace.value, link: inputLink.value});
  closePopupPlace();
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  addPopupEscapeKey();
  addPopupClickOverlay();
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removePopupEscapeKey();
  removePopupClickOverlay();
};

function openPopupProfile() {
  openPopup(popupProfile);
  inputName.value = names.textContent;
  inputJob.value = job.textContent; 
};

function openPopupPlace() {
  openPopup(popupPlace);
  cardValidator.deactivationButton();
  
};

function closePopupProfile() {
  closePopup(popupProfile);
};

function closePopupPlace() {
  closePopup(popupPlace);
  formElementAdd.reset();
};

function closePopupImage() {
  closePopup(popupImage);
};

function submitProfileForm(event) {
	event.preventDefault(); 
  names.textContent = inputName.value;
  job.textContent = inputJob.value;
  closePopupProfile();
};

function addPopupEscapeKey() {
  document.addEventListener('keydown',  closeByEsc);
};

function removePopupEscapeKey() {
  document.removeEventListener('keydown',  closeByEsc);
};

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  };
};

function addPopupClickOverlay() {
  window.addEventListener('click',  closeByOverlay);
};

function removePopupClickOverlay() {
  window.removeEventListener('click',  closeByOverlay);
};

function closeByOverlay (evt) {
  if (evt.target.classList.contains('popup_opened')) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

popupProfileOpenButton.addEventListener('click', openPopupProfile);
popupImageCloseButton.addEventListener('click', closePopupImage);
popupProfileCloseButton.addEventListener('click', closePopupProfile);
popupPlaceOpenButton.addEventListener('click', openPopupPlace);
popupPlaceCloseButton.addEventListener('click', closePopupPlace);
formElementAdd.addEventListener('submit', addCard);
formElementProfile.addEventListener('submit', submitProfileForm);
cardValidator.enableValidation();
profileValidator.enableValidation();

/* const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileOpenButton = document.querySelector('.profile__button-edit');
const popupProfileCloseButton = document.querySelector('.popup__close');
const names = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');
const popupPlace = document.querySelector('.popup_type_card-add');
const popupPlaceOpenButton = document.querySelector('.profile__button-add');
const popupPlaceCloseButton = document.querySelector('.popup__close_type_card-add');
const template = document.querySelector('.template-place').content;
const box = document.querySelector('.places__box');
const popupImage = document.querySelector('.popup_type_picture');
const popupPhoto = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__subtitle');
const popupImageCloseButton = document.querySelector('.popup__close_type_picture');
const inputPlace = document.querySelector('.popup__input-place');
const inputLink = document.querySelector('.popup__input-link');
const inputJob = document.querySelector('.popup__input-job');
const inputName = document.querySelector('.popup__input-name');
const formElementAdd = document.querySelector('.popup__body_type_card-add');
const formElementProfile = document.querySelector('.popup__body_type_profile');



initialCards.forEach(renderCard);

function renderCard(cardItem) {
  box.prepend(createCard(cardItem));
};
 
function createCard(cardItem){
  const newItem = template.cloneNode(true);
  const newImage = newItem.querySelector('.place__image');
  newItem.querySelector('.place__subtitle').textContent = cardItem.name;
  newImage.src = cardItem.link;
  newImage.alt = cardItem.name;
  newItem.querySelector('.place__heart').addEventListener('click', function(event) {
    event.target.classList.toggle('place__heart_active');
  });
  newItem.querySelector('.place__delete').addEventListener('click', function(event) {
    event.target.closest('.place').remove();
  });
  newItem.querySelector('.place__image').addEventListener('click', function (openPopupImage) {
    openPopup (popupImage);
    popupPhoto.src = cardItem.link;
    popupPhoto.alt = cardItem.name;
    popupTitle.textContent = cardItem.name;
  });
  return newItem;
};

function addCard(event) {
  event.preventDefault();
  renderCard({name: inputPlace.value, link: inputLink.value});
  closePopupPlace();
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  addPopupEscapeKey();
  addPopupClickOverlay();
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removePopupEscapeKey();
  removePopupClickOverlay();
};

function openPopupProfile() {
  openPopup(popupProfile);
  inputName.value = names.textContent;
  inputJob.value = job.textContent; 
};

function openPopupPlace() {
  openPopup(popupPlace);
  checkingFormFill(popupPlace);
  formElementAdd.reset();
};

function closePopupProfile() {
  closePopup(popupProfile);
};

function closePopupPlace() {
  closePopup(popupPlace);
  formElementAdd.reset();
};

function closePopupImage() {
  closePopup(popupImage);
};

function submitProfileForm(event) {
	event.preventDefault(); 
  names.textContent = inputName.value;
  job.textContent = inputJob.value;
  closePopupProfile();
};

function addPopupEscapeKey() {
  document.addEventListener('keydown',  closeByEsc);
};

function removePopupEscapeKey() {
  document.removeEventListener('keydown',  closeByEsc);
};

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  };
};

function addPopupClickOverlay() {
  window.addEventListener('click',  closeByOverlay);
};

function removePopupClickOverlay() {
  window.removeEventListener('click',  closeByOverlay);
};

function closeByOverlay (evt) {
  if (evt.target.classList.contains('popup_opened')) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

popupProfileOpenButton.addEventListener('click', openPopupProfile);
popupImageCloseButton.addEventListener('click', closePopupImage);
popupProfileCloseButton.addEventListener('click', closePopupProfile);
popupPlaceOpenButton.addEventListener('click', openPopupPlace);
popupPlaceCloseButton.addEventListener('click', closePopupPlace);
formElementAdd.addEventListener('submit', addCard);
formElementProfile.addEventListener('submit', submitProfileForm);

 */