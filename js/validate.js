const validationConfig = ({
  formSelector: '.popup__body',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_notactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});


function showInputError(validationConfig, inputElement) {
  inputElement.classList.add(validationConfig.inputErrorClass);
};

function hideInputError(validationConfig, inputElement) {
  inputElement.classList.remove(validationConfig.inputErrorClass);
};

function activationTextError(validationConfig, inputElement) {
  const inputError = document.querySelector(`.${inputElement.id}-error`);
  inputError.textContent = showErrorMessage(inputElement);
  inputError.classList.add(validationConfig.errorClass);
};

function deactivationTextError(validationConfig, inputElement) {
  const inputError = document.querySelector(`.${inputElement.id}-error`);
  inputError.classList.remove(validationConfig.errorClass);
};

function showErrorMessage(inputElement) {
  return inputElement.validationMessage;
};

function activationButton(validationConfig, inputElement) {
  const popupOpened = inputElement.closest(validationConfig.formSelector);
  const buttonElement = popupOpened.querySelector(validationConfig.submitButtonSelector);
  buttonElement.removeAttribute('disabled');
  buttonElement.classList.remove(validationConfig.inactiveButtonClass);
};

function deactivationButton(validationConfig, inputElement) {
  const popupOpened = inputElement.closest(validationConfig.formSelector);
  const buttonElement = popupOpened.querySelector(validationConfig.submitButtonSelector);
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
};

function checkInputValidity(validationConfig, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(validationConfig, inputElement);
    activationTextError(validationConfig, inputElement);
  } else {
    hideInputError(validationConfig, inputElement);
    deactivationTextError(validationConfig, inputElement);
  };
  toggleButtonState(validationConfig, inputElement);
};

function toggleButtonState(validationConfig, inputElement) {
  const validityFormActive = hasInvalidInput(validationConfig, inputElement);
  if (!validityFormActive) {
    activationButton(validationConfig, inputElement);
  } else {
    deactivationButton(validationConfig, inputElement);
  };
};

function checkingFormFill(popup) {
  const inputList = popup.querySelectorAll('input');
  const formElement = {
    submitButtonSelector: '.popup__button', 
    formSelector: '.popup__body', 
    inactiveButtonClass: 'popup__button_notactive'
  };
  inputList.forEach((inputElement) => {
    if (inputElement.value.length === 0) {
      deactivationButton(formElement, inputElement);
    };
  });
};

function hasInvalidInput(validationConfig, inputElement) {
  const popupOpened = inputElement.closest(validationConfig.formSelector);
  const inputsFormOpened = Array.from(popupOpened.querySelectorAll(validationConfig.inputSelector));
  return inputsFormOpened.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function enableValidation(validationConfig) {
  const arrayForms = Array.from(document.querySelectorAll(validationConfig.formSelector));
  arrayForms.forEach(form => {
    const arrayInputsForm = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    arrayInputsForm.forEach(inputElement => {
      inputElement.addEventListener('input', () => checkInputValidity(validationConfig, inputElement));
  });
});
};

enableValidation(validationConfig);