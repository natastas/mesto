export class FormValidator {
    constructor (settings, form) {
        this._form = form;
        this._settings = settings;
        this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
    }
    
    _showInputError(inputElement, errorMesage) {
        const inputError = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        inputError.textContent = errorMesage;
        inputError.classList.add(this._settings.errorClass);
    };
      
    _hideInputError(inputElement) {
        const inputError = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        inputError.classList.remove(this._settings.errorClass);
        inputError.textContent = '';
      };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(inputElement);
        };
      };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _activationButton() {
        this._buttonElement.disabled = false;
        this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      };
      
    deactivationButton() {
        this._buttonElement.disabled = true;
        this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    };

    _toggleButtonState() {
        if (!this._hasInvalidInput()) {
            this._activationButton();
        } else {
            this.deactivationButton();
        };
      };

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement)
                this._toggleButtonState()
            });
        });
    }

    resetErrors() {
        this._form.reset();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this._toggleButtonState();
    }

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._setEventListeners();
    }
}