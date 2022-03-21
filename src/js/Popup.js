export class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
    }

    open() {
        this._popup.classList.add('popup_opened');
        
    }

    close() {
        this._popup.classList.remove('popup_opened');
        
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close(this._popup); 
        };
    }

    _setEventListeners() {
        this._popup.forEach((popup) => {
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