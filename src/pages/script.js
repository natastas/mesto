import './index.css';

import { 
  initialCards,
  popupAvatarOpenButton,
  validationConfig,
  popupProfileOpenButton,
  popupPlaceOpenButton,
  inputJob,
  inputName,
  formElementAdd,
  formElementProfile
 } from "../constants/constants.js";

import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../components/Api.js";

let userId;

api.getProfile()
  .then(res => {
    userInfo.setUserInfo(res.name, res.about)
    userId = res._id 
  })

api.getInitialCards()
  .then(cardList => {
    cardList.forEach(data => {
      const card = createCard({
        name: data.name,
        link: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id,
        
      })
      section.addItem(card)
    })
  })

const renderCard = (data) => {
  const card = createCard(data);
  section.addItem(card);
}

const createCard = (data) => {
  const card = new Card(
    data,
    '#template-place',
    () => {
      imagePopup.open(data.name, data.link)
    }, 
    (id) => {
      confirmPopup.open()
      confirmPopup.changeSubmitHandler(() => {
        api.deleteCard(id)
        .then(res => {
          card.deleteCard()
          confirmPopup.close()
        })
      });
    },
    (id) => {
      if(card.isLiked()) {
        api.deleteLike(id)
        .then(res => {
          card.setLikes(res.likes)
        })
      } else {
        api.addLike(id)
        .then(res => {
          card.setLikes(res.likes)
        })
      }
    }
  )
 
 return card.getView();
}

function submitProfileForm(data) {
	const {jobInput, nameInput} = data; 

  api.editProfile(nameInput, jobInput) 
    .then(res => {
      userInfo.setUserInfo(nameInput, jobInput)
    })
  
  editProfilePopup.close();
};

const handleCardSubmit = (data) => {
  api.addCard(data.name, data.link)
  .then(res => {
    const card = createCard({
      name: res.name,
      link: res.link,
      likes: res.likes,
      id: res._id,
      userId: userId,
      ownerId: res.owner._id,
      
    });
    section.addItem(card);
    addCardPopup.close();
  })
};

popupPlaceOpenButton.addEventListener('click', () => {
  cardValidator.deactivationButton();
  addCardPopup.open();
});

popupProfileOpenButton.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo()
  inputName.value = name;
  inputJob.value = job;
  editProfilePopup.open();
});

let urlAvatar;

function updateAvatar (data) {
  api.editAvatar(data.link)
  .then((res) => {
    console.log('res', res);
    urlAvatar = res.avatar;
    userInfo.setUserInfo(res.name, res.link, res.avatar)
    avatarPopup.close()
  })

} 

popupAvatarOpenButton.addEventListener('click', () => { 
  avatarPopup.open()
});

const profileValidator = new FormValidator(validationConfig, formElementProfile);
const cardValidator = new FormValidator(validationConfig, formElementAdd);
const section = new Section({items: [], renderer: renderCard}, '.places__box');
const imagePopup = new PopupWithImage('.popup_type_picture');
const addCardPopup = new PopupWithForm('.popup_type_card-add', handleCardSubmit);
const editProfilePopup = new PopupWithForm('.popup_type_profile', submitProfileForm);
const confirmPopup = new PopupWithForm('.popup_type_delete-card');
const avatarPopup = new PopupWithForm('.popup_type_avatar', updateAvatar);
const userInfo = new UserInfo({
  profileNameSelector: '.profile__title', 
  profileJobSelector: '.profile__subtitle', 
  profileAvatarSelector: '.profile__photo'
});

cardValidator.enableValidation();
profileValidator.enableValidation();
section.renderItems();
imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
confirmPopup.setEventListeners();
avatarPopup.setEventListeners();