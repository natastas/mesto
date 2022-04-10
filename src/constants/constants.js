  export const validationConfig = ({
    formSelector: '.popup__body',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_notactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  });
  
  export const popupProfileOpenButton = document.querySelector('.profile__button-edit');
  export const popupPlaceOpenButton = document.querySelector('.profile__button-add');
  export const popupAvatarOpenButton = document.querySelector('.profile__photo-container');
  export const inputJob = document.querySelector('.popup__input-job');
  export const inputName = document.querySelector('.popup__input-name');
  export const formElementAdd = document.querySelector('.popup__body_type_card-add');
  export const formElementProfile = document.querySelector('.popup__body_type_profile');
  export const formElementAvatar = document.querySelector('.popup__body_type_avatar');