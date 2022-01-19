let popup = document.querySelector('.popup');
let openPopup = document.querySelector('.profile__button-edit');
let closePopup = document.querySelector('.popup__close');
let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');

openPopup.addEventListener('click', function popupOpen() {
    popup.classList.add('popup_opened');
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
  });

closePopup.addEventListener('click', function popupClose() {
    popup.classList.remove('popup_opened');
});

let formElement = document.querySelector('.popup__body');

function formSubmitHandler (evt) {
	evt.preventDefault(); 
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);

/* let hearts = document.querySelectorAll('.place__heart');
hearts.forEach(function(entry) {
  entry.onclick = function(event) {
    event.preventDefault();
    entry.classList.toggle('place__heart_active');
    entry.classList.toggle('place__heart_notactive');
  };
}); */