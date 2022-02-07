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
  ClosePopupPlace();
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

function OpenPopupProfile() {
  openPopup(popupProfile);
  inputName.value = names.textContent;
  inputJob.value = job.textContent; 
};

function OpenPopupPlace() {
  formElementAdd.reset();
  openPopup(popupPlace);
  
};

function ClosePopupProfile() {
  closePopup(popupProfile);
};

function ClosePopupPlace() {
  closePopup(popupPlace);
};

function ClosePopupImage() {
  closePopup(popupImage);
};

function submitProfileForm(event) {
	event.preventDefault(); 
  names.textContent = inputName.value;
  job.textContent = inputJob.value;
  popupCloseProfile();
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

popupProfileOpenButton.addEventListener('click', OpenPopupProfile);
popupImageCloseButton.addEventListener('click', ClosePopupImage);
popupProfileCloseButton.addEventListener('click', ClosePopupProfile);
popupPlaceOpenButton.addEventListener('click', OpenPopupPlace);
popupPlaceCloseButton.addEventListener('click', ClosePopupPlace);
formElementAdd.addEventListener('submit', addCard);
formElementProfile.addEventListener('submit', submitProfileForm);