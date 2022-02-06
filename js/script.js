const popupProfile = document.querySelector('.popup_type_profile');
const openPopupProfile = document.querySelector('.profile__button-edit');
const closePopupProfile = document.querySelector('.popup__close');
const names = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');
const popupPlace = document.querySelector('.popup_type_card-add');
const openPopupPlace = document.querySelector('.profile__button-add');
const closePopupPlace = document.querySelector('.popup__close_type_card-add');
const template = document.querySelector('.template-place').content;
const box = document.querySelector('.places__box');
const popupImage = document.querySelector('.popup_type_picture');
const popupPhoto = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__subtitle');
const closePopupImage = document.querySelector('.popup__close_type_picture');
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

function formSubmitHandler(event) {
	event.preventDefault(); 
  names.textContent = inputName.value;
  job.textContent = inputJob.value;
  popupCloseProfile();
};

// Вынесем все необходимые элементы формы в константы
const formElement = document.querySelector('.popup__body');
const inputElement = formElement.querySelector('.popup__input');

const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}; 

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement)
    });
  });
}; 

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__body'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation(); 
// Вызовем функцию isValid на каждый ввод символа

openPopupProfile.addEventListener('click', popupOpenProfile);
closePopupImage.addEventListener('click', popupCloseImage);
closePopupProfile.addEventListener('click', popupCloseProfile);
openPopupPlace.addEventListener('click', popupOpenPlace);
closePopupPlace.addEventListener('click', popupClosePlace);
formElementAdd.addEventListener('submit', addCard);
formElementProfile.addEventListener('submit', formSubmitHandler);

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