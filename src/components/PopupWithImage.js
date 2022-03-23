import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  open (text, link) {
    const imageElement = this._popup.querySelector('.popup__image');
    const subtitle = this._popup.querySelector('.popup__subtitle');

    imageElement.src = link;
    subtitle.textContent = text;

    super.open()
  }     
}