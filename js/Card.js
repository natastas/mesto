import { popupPhoto, popupTitle, openPopup, popupImage } from './script.js';

export class Card {
  constructor(data, cardTemplateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._template = document.querySelector(cardTemplateSelector).content.querySelector('.place');

  };

  _handleLikeIcon = () =>  {
    this._likeButton.classList.toggle('place__heart_active');
  };

  _handleDeleteCard = () => {
    this._newItem.remove();
  };

  _openPopupImage = () => {
    popupPhoto.src = this._link;
    popupPhoto.alt = this._name;
    popupTitle.textContent = this._name;
    openPopup (popupImage);
  };

  _setEventListeners() {
    const deleteButton = this._newItem.querySelector('.place__delete');

    deleteButton.addEventListener('click', this._handleDeleteCard);
    this._likeButton.addEventListener('click', this._handleLikeIcon);
    this._newImage.addEventListener('click', this._openPopupImage);
  }

  createCard() {
    this._newItem = this._template.cloneNode(true);
    this._likeButton = this._newItem.querySelector('.place__heart');
    this._newImage = this._newItem.querySelector('.place__image');
    
    this._newItem.querySelector('.place__subtitle').textContent = this._name;
    this._newImage.src = this._link;
    this._newImage.alt = this._name;

    this._setEventListeners();


    return this._newItem;
  }

}