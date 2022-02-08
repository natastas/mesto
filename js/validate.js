function showInputError(formElement, inputElement) {
  inputElement.classList.add(formElement['inputErrorClass']);
};

function hideInputError(formElement, inputElement) {
  inputElement.classList.remove(formElement['inputErrorClass']);
};

function activationTextError(formElement, inputElement) {
  const popupOpened = inputElement.closest(formElement['formSelector']);
  const inputError = popupOpened.querySelector(`.${inputElement.id}-error`);
  inputError.textContent = ShowErrorMessage(inputElement);
  inputError.classList.add(formElement['errorClass']);
};

function deactivationTextError(formElement, inputElement) {
  const popupOpened = inputElement.closest(formElement['formSelector']);
  const inputError = popupOpened.querySelector(`.${inputElement.id}-error`);
  inputError.classList.remove(formElement['errorClass']);
};

function ShowErrorMessage(inputElement) {
  return inputElement.validationMessage;
};

function activationButton(formElement, inputElement) {
  const popupOpened = inputElement.closest(formElement['formSelector']);
  const buttonElement = popupOpened.querySelector(formElement['submitButtonSelector']);
  buttonElement.removeAttribute('disabled');
  buttonElement.classList.remove(formElement['inactiveButtonClass']);
};

function deactivationButton(formElement, inputElement) {
  const popupOpened = inputElement.closest(formElement['formSelector']);
  const buttonElement = popupOpened.querySelector(formElement['submitButtonSelector']);
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(formElement['inactiveButtonClass']);
};

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement);
    activationTextError(formElement, inputElement);
  } else {
    hideInputError(formElement, inputElement);
    deactivationTextError(formElement, inputElement);
  };
  toggleButtonState(formElement, inputElement);
};

function toggleButtonState(formElement, inputElement) {
  const validityFormActive = hasInvalidInput(formElement, inputElement);
  if (!validityFormActive) {
    activationButton(formElement, inputElement);
  } else {
    deactivationButton(formElement, inputElement);
  };
};

function checkingFormFill(popup) {
  const inputList = popup.querySelectorAll('input');
  const formElement = {
    submitButtonSelector: '.popup__button', 
    formSelector: '.popup__body', 
    inactiveButtonClass: 'popup__button_notactive'};
  inputList.forEach((inputElement) => {
    if (inputElement.value.length === 0) {
      deactivationButton(formElement, inputElement);
    };
  });
};

function hasInvalidInput(formElement, inputElement) {
  const popupOpened = inputElement.closest(formElement['formSelector']);
  const inputsFormOpened = Array.from(popupOpened.querySelectorAll(formElement['inputSelector']));
  return inputsFormOpened.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function enableValidation(formElement) {
  const arrayForms = Array.from(document.querySelectorAll(formElement['formSelector']));
  arrayForms.forEach(form => {
    const arrayInputsForm = Array.from(form.querySelectorAll(formElement['inputSelector']));
    arrayInputsForm.forEach(inputElement => {
      inputElement.addEventListener('input', () => checkInputValidity(formElement, inputElement));
  });
});
};

enableValidation({
  formSelector: '.popup__body',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_notactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}); 

/* const showInputError = (formElement, inputElement, errorMessage) => {
  
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
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

  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 

const enableValidation = () => {
  
  const formList = Array.from(document.querySelectorAll('.popup__body'));

   formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};



const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
  })
}; 

function toggleButtonState (inputList, buttonElement) {

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_notactive');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('popup__button_notactive');
    buttonElement.removeAttribute('disabled');
  }
};  */