const popupProfile = document.querySelector('.popup_type_profile');
const openPopupProfile = document.querySelector('.profile__button-edit');
const closePopupProfile = document.querySelector('.popup__close');
const names = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__body_type_profile');
const popupPlace = document.querySelector('.popup_type_card-add');
const openPopupPlace = document.querySelector('.profile__button-add');
const closePopupPlace = document.querySelector('.popup__close_type_card-add');
const template = document.querySelector('.template-place').content;
const box = document.querySelector('.places__box');
const inputPlace = document.querySelector('.popup__text_place');
const inputLink = document.querySelector('.popup__text_link');
const inputJob = document.querySelectorAll('.popup__text_job');
const inputName = document.querySelectorAll('.popup__text_name');
const formElementAdd = document.querySelector('.popup__body_type_card-add');
const popupImage = document.querySelector('.popup_type_picture');
const popupPhoto = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__subtitle');
const closePopupImage = document.querySelector('.popup__close_type_picture');

//Добавляем форму добавления новой карточки
initialCards.forEach(renderCard);

function renderCard(cardItem) {
  box.prepend(createCard(cardItem));
};
 
function createCard(cardItem){
  const newItem = template.cloneNode(true);
  newItem.querySelector('.place__subtitle').textContent = cardItem.name;
  newItem.querySelector('.place__image').src = cardItem.link;
  newItem.querySelector('.place__image').alt = cardItem.name;
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
  popupClosePlace();
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened')
};

function popupOpenProfile() {
  openPopup(popupProfile);
  inputName.value = names.textContent;
  inputJob.value = job.textContent; 
};

function formSubmitHandler(event) {
	event.preventDefault(); 
  names.textContent = inputName.value;
  job.textContent = inputJob.value;
  popupCloseProfile();
};

function popupOpenPlace() {
  openPopup(popupPlace);
};

function popupCloseProfile() {
  closePopup(popupProfile);
};

function popupClosePlace() {
  closePopup(popupPlace);
};

function popupCloseImage() {
  closePopup(popupImage);
};

openPopupProfile.addEventListener('click', popupOpenProfile);
closePopupImage.addEventListener('click', popupCloseImage);
closePopupProfile.addEventListener('click', popupCloseProfile);
openPopupPlace.addEventListener('click', popupOpenPlace);
closePopupPlace.addEventListener('click', popupClosePlace);
formElementAdd.addEventListener('submit', addCard);
formElement.addEventListener('submit', formSubmitHandler);

/* document.addEventListener('keydown', function(ee) {
  if (ee.key === 'Escape') {
  popupClose()
  };
  });

window.addEventListener('click', function(e){
  if (e.target == popup) {
    popupClose();
  };
}); */