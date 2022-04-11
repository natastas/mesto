import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector)
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector('.popup__body');
        this._buttonSubmit = this._form.querySelector('.popup__button');
        this._titleButton = this._buttonSubmit.textContent;
    }

    _getInputValues() {
        const inputs = [...this._form.querySelectorAll('.popup__input')]
        const values = {}
        inputs.forEach((input) => {
            values[input.name] = input.value
        })
        
        return values
    }

    changeSubmitHandler(newSubmitHandler) {
        this._handleSubmit = newSubmitHandler;
    }

    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', () => {
            this._handleSubmit(this._getInputValues())
        })
    }

    close() {
        super.close();
        this._form.reset()
    }

    renderLoading(load) {
        if (load) {
          this._buttonSubmit.textContent = 'Сохранение...';
        } else {
          this._buttonSubmit.textContent = this._titleButton;
        }
      }
}