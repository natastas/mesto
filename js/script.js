let popupProfile = document.querySelector('.popup');
let openPopupProfile = document.querySelector('.profile__button-edit');
let closePopupProfile = document.querySelector('.popup__close');
let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__body');
let popupPlace = document.querySelector('.popup_place');
let openPopupPlace = document.querySelector('.profile__button-add');
let closePopupPlace = document.querySelector('.popup__close_place');
let formElementAdd = document.querySelector('.popup__body_add')

let del = document.querySelector('.place__delete');

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

//Добавляем данные из массива в HTML
let card = document.querySelector('.template-place').content; 
let div = document.querySelector('.places');

initialCards.forEach(function (element) {
  const cards = card.cloneNode(true);
  cards.querySelector('.place__subtitle').textContent = element.name;
  cards.querySelector('.place__subtitle').alt = element.name;
  cards.querySelector('.place__image').src = element.link;
  div.append(cards);
});

/* //ВАДОС, тут я пытаюсь сделать так, чтобы карточка добавлялась
function formSubmitAdd(event) {
  event.preventDefault();
  const DataForms = [{name: titleInput.value, link: linkInput.value}];
  DataForms.forEach(evt);
  titleInput.value = '';
  linkInput.value = '';
  popupClosePlace(event);
}
formElementAdd.addEventListener('submit', formSubmitAdd);

//Вадос тут я пытаюсь сделать так, чтобы карточка удалялась
function deleteCard(event) {
  event.currentTarget.closest('.template-place').remove();
}
del.addEventListener('click', deleteCard);  */

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
    entry.classList.toggle('place__heart_notactive');
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