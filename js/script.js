let popupProfile = document.querySelector('.popup');
let openPopupProfile = document.querySelector('.profile__button-edit');
let closePopupProfile = document.querySelector('.popup__close');
let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__body');
let popupPlace = document.querySelector('.popup_place');
let openPopupPlace = document.querySelector('.profile__button-add');
let closePopupPlace = document.querySelector('.popup__close_place');


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

const template = document.querySelector('.template-place').content;
const box = document.querySelector('.places__box');
const inputPlace = document.querySelector('.popup__text_place');
const inputLink = document.querySelector('.popup__text_link');
const formElementAdd = document.querySelector('.popup__body_add');

function render() {
  initialCards.forEach(renderItem);
};

function renderItem(text){
  const newItem = template.cloneNode(true);
  newItem.querySelector('.place__subtitle').textContent = text.name;
  newItem.querySelector('.place__image').src = text.link;
  newItem.querySelector('.place__delete').addEventListener('click', function(event) {
    event.target.closest('.place').remove();
  });
  box.append(newItem);
};

function addCard(event) {
  event.preventDefault();
  renderItem({name: inputPlace.value, link: inputLink.value});
  popupClosePlace();
}
formElementAdd.addEventListener('submit', addCard);

render()

const popupImage = document.querySelector('.popup_image');
const popupPhoto = document.querySelector('.popup__image');
const placeImage = document.querySelector('.place__image');
const popupTitle = document.querySelector('.popup__title');

function openPopupImage(text) {
  popupImage.classList.add('popup_opened');
  popupPhoto.src = text.link;
  popupTitle.textContent = text.name;
};
placeImage.addEventListener('click', () => openPopupImage(text));


//Открываем и закрываем попАп профиля
function popupOpenProfile() {
  popupProfile.classList.add('popup_opened');
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
};
openPopupProfile.addEventListener('click', popupOpenProfile);

function popupCloseProfile() {
  popupProfile.classList.remove('popup_opened');
};
closePopupProfile.addEventListener('click', popupCloseProfile);

//Открываем и закрываем попАп добавления карточки
function popupOpenPlace() {
  popupPlace.classList.add('popup_opened');
};
openPopupPlace.addEventListener('click', popupOpenPlace);

function popupClosePlace() {
  popupPlace.classList.remove('popup_opened');
};
closePopupPlace.addEventListener('click', popupClosePlace);

//Сохраняем форму нажатием кнопки "Сохранить"
function formSubmitHandler (evt) {
	evt.preventDefault(); 
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popupCloseProfile();
}
formElement.addEventListener('submit', formSubmitHandler);

//Добавляем лайк карточкам
let hearts = document.querySelectorAll('.place__heart');
hearts.forEach(function(entry) {
  entry.onclick = function(event) {
    event.preventDefault();
    entry.classList.toggle('place__heart_active');
  };
}); 

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