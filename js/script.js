let popup = document.querySelector('.popup');
let openPopup = document.querySelector('.profile__button-edit');
let closePopup = document.querySelector('.popup__close');
let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__body');

function popupOpen() {
  popup.classList.add('popup_opened');
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
};

function popupClose() {
  popup.classList.remove('popup_opened');
};

function formSubmitHandler (evt) {
	evt.preventDefault(); 
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popupClose();
}

openPopup.addEventListener('click', popupOpen);

closePopup.addEventListener('click', popupClose);

formElement.addEventListener('submit', formSubmitHandler);

/* let hearts = document.querySelectorAll('.place__heart');
hearts.forEach(function(entry) {
  entry.onclick = function(event) {
    event.preventDefault();
    entry.classList.toggle('place__heart_active');
    entry.classList.toggle('place__heart_notactive');
  };
}); */