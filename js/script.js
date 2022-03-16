import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { Popup } from "./Popup.js";

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
const names = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');
const popupPlace = document.querySelector('.popup_type_card-add');
const popupPlaceOpenButton = document.querySelector('.profile__button-add');
const box = document.querySelector('.places__box');
const popupImage = document.querySelector('.popup_type_picture');
const popupPhoto = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__subtitle');
const inputPlace = document.querySelector('.popup__input-place');
const inputLink = document.querySelector('.popup__input-link');
const inputJob = document.querySelector('.popup__input-job');
const inputName = document.querySelector('.popup__input-name');
const formElementAdd = document.querySelector('.popup__body_type_card-add');
const cardValidator = new FormValidator(validationConfig, formElementAdd);
const formElementProfile = document.querySelector('.popup__body_type_profile');
const profileValidator = new FormValidator(validationConfig, formElementProfile);
const popups = document.querySelectorAll('.popup');

const y = new Popup(popups);

initialCards.forEach(renderCard);

function renderCard(data) {
  const card = new Card(data, '#template-place', handleCardClick);
  const newElement = card.createCard();
  box.prepend(newElement);
};
 
function handleCardClick (name, link) {
  popupPhoto.src = this._link;
  popupPhoto.alt = this._name;
  popupTitle.textContent = this._name;
  openPopup (popupImage);
};

function addCard(event) {
  event.preventDefault();
  renderCard({name: inputPlace.value, link: inputLink.value});
  closePopupPlace();
};

/*  export function openPopup(popup) {
  popup.classList.add('popup_opened');
  addPopupEscapeKey();
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removePopupEscapeKey();
}; */

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

/* function closePopupImage() {
  closePopup(popupImage);
}; */

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

/* popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup)
      }
  })
}) */

popupPlaceOpenButton.addEventListener('click', openPopupPlace);
popupProfileOpenButton.addEventListener('click', openPopupProfile);
formElementAdd.addEventListener('submit', addCard);
formElementProfile.addEventListener('submit', submitProfileForm);
cardValidator.enableValidation();
profileValidator.enableValidation();