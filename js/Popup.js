export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        addPopupEscapeKey();
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        removePopupEscapeKey();
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close(this._popupSelector); 
        };
    }

    _setEventListeners() {
        this._popupSelector.forEach((popup) => {
            popup.addEventListener('mousedown', (evt) => {
                if (evt.target.classList.contains('popup_opened')) {
                    this.close(popup)
                }
                if (evt.target.classList.contains('popup__close')) {
                  this.close(popup)
                }
            })
          })
    }
}