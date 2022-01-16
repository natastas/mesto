let popup = document.querySelector('.popup');
let openPopup = document.querySelector('.button-edit');
let closePopup = document.querySelector('.popup__close');

openPopup.addEventListener('click', function(events) {
    events.preventDefault();
    popup.classList.add('popup_opened');
  });
closePopup.addEventListener('click', function(events) {
    events.preventDefault();
    popup.classList.remove('popup_opened');
});

let hearts = document.querySelectorAll('.heart');
hearts.forEach(function(entry) {
  entry.onclick = function(event) {
    event.preventDefault();
    entry.classList.toggle('heart_active');
    entry.classList.toggle('heart_notactive');
  };
});


let formElement = document.querySelector('.popup__body');

function formSubmitHandler (evt) {
	evt.preventDefault(); 

	let nameInput = document.querySelector('.text__name');
	let jobInput = document.querySelector('.text__job');
  let name = document.querySelector('.profile__title');
  let job = document.querySelector('.profile__subtitle');
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);