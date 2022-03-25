import './index.css';

import { 
  initialCards,
  validationConfig,
  popupProfileOpenButton,
  popupPlaceOpenButton,
  inputJob,
  inputName,
  formElementAdd,
  formElementProfile
 } from "../constants/constants.js";

import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

const renderCard = (data) => {
  const card = createCard(data);
  section.addItem(card);
}

const createCard = (data) => {
  const card = new Card(data, '#template-place', () => {
    imagePopup.open(data.name, data.link)
  })
 
 return card.getView();
}

function submitProfileForm(data) {
	const {jobInput, nameInput} = data; 
  userInfo.setUserInfo(nameInput, jobInput)
  editProfilePopup.close();
};

function handleCardSubmit (data) {
  const card = createCard(data);
  section.addItem(card);
  addCardPopup.close();
};

popupPlaceOpenButton.addEventListener('click', () => {
  cardValidator.deactivationButton();
  addCardPopup.open();
});

popupProfileOpenButton.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo()
  inputName.value = name;
  inputJob.value = job;
  editProfilePopup.open();
});

const profileValidator = new FormValidator(validationConfig, formElementProfile);
const cardValidator = new FormValidator(validationConfig, formElementAdd);
const section = new Section({items: initialCards, renderer: renderCard}, '.places__box');
const imagePopup = new PopupWithImage('.popup_type_picture');
const addCardPopup = new PopupWithForm('.popup_type_card-add', handleCardSubmit);
const editProfilePopup = new PopupWithForm('.popup_type_profile', submitProfileForm);
const userInfo = new UserInfo({profileNameSelector: '.profile__title', profileJobSelector: '.profile__subtitle'})

cardValidator.enableValidation();
profileValidator.enableValidation();
section.renderItems()
imagePopup.setEventListeners()
addCardPopup.setEventListeners()
editProfilePopup.setEventListeners()