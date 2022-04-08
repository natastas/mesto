export class Card {
  constructor(data, cardTemplateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId; 
    this._template = document.querySelector(cardTemplateSelector).content.querySelector('.place');
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  };

  _paintedlLike = () =>  {
    this._likeButton.classList.add('place__heart_active');
  };

  _notPaintedLike = () =>  {
    this._likeButton.classList.remove('place__heart_active');
  };

  deleteCards = () => {
    this._newItem.remove();
    this._newItem = null;
  };

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this._id));
    this._likeButton.addEventListener('click', () => this._handleLikeClick(this._id));
    this._newImage.addEventListener('click', () => this._handleCardClick());
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    const likeCountElement = this._newItem.querySelector('.place__heart-count');
    likeCountElement.textContent = this._likes.length
    
    if(this.isLiked()) {
      this._paintedlLike()
    } else {
      this._notPaintedLike()
    }
  }

  isLiked() {
    const userHasLikedCard = this._likes.find(user => user._id === this._userId)
    return userHasLikedCard
  }

  getView() {
    this._newItem = this._template.cloneNode(true);
    this._likeButton = this._newItem.querySelector('.place__heart');
    this._newImage = this._newItem.querySelector('.place__image');
    this._deleteButton = this._newItem.querySelector('.place__delete');
    
    this._newItem.querySelector('.place__subtitle').textContent = this._name;
    this._newImage.src = this._link;
    this._newImage.alt = this._name;  
    
    this._setEventListeners();
    this.setLikes(this._likes)
    if(this._ownerId !== this._userId) {
      this._newItem.querySelector('.place__delete').style.display = 'none'
    }
    
    return this._newItem;
  }
}