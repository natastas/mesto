import './index.css';

import { 
  popupAvatarOpenButton,
  validationConfig,
  popupProfileOpenButton,
  popupPlaceOpenButton,
  inputJob,
  inputName,
  formElementAdd,
  formElementProfile,
  formElementAvatar
 } from "../constants/constants.js";

import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../components/Api.js";

let userId;
let urlAvatar;

api.getProfile()
  .then((res) => {
    userInfo.setUserInfo(res.name, res.about, res.avatar)
    urlAvatar = res.avatar;
    userId = res._id;
  })
  .catch(console.log);

api.getInitialCards()
  .then(cardList => {
    cardList.reverse();
    cardList.forEach(data => {
      const card = createCard({
        name: data.name,
        link: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id,
        avatar: data.avatar
      })
      section.addItem(card)
    })
  })
  .catch(console.log);

  const profileValidator = new FormValidator(validationConfig, formElementProfile);
  const cardValidator = new FormValidator(validationConfig, formElementAdd);
  const avatarValidator = new FormValidator(validationConfig, formElementAvatar); 

cardValidator.enableValidation();
profileValidator.enableValidation();
avatarValidator.enableValidation() 

popupProfileOpenButton.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo();
  inputName.value = name;
  inputJob.value = job;
  profileValidator.deactivationButton();
  editProfilePopup.open();
});

popupPlaceOpenButton.addEventListener('click', () => {
  cardValidator.deactivationButton();
  cardValidator.resetErrors();
  addCardPopup.open();
});

const submitProfileForm = (data) => {
	const {jobInput, nameInput} = data; 
  editProfilePopup.renderLoading(true);
  api.editProfile(nameInput, jobInput) 
    .then(() => {
      userInfo.setUserInfo(nameInput, jobInput, urlAvatar);
      editProfilePopup.close();
    })
    .catch(console.log)
    .finally(() => {
      editProfilePopup.renderLoading(false);
    });
};

function createCard(data) {
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
        .catch(console.log)
      });
    },
    (id) => {
      if(card.isLiked()) {
        api.deleteLike(id)
        .then(res => {
          card.setLikes(res.likes)
        })
        .catch(console.log)
      } else {
        api.addLike(id)
        .then(res => {
          card.setLikes(res.likes)
        })
        .catch(console.log)
      }
    }
  )
 
 return card.getView();
}

const section = new Section({ 
  items: [], 
  renderer: (data) => {
  const card = createCard(data);
  section.addItem(card);
} 
}, 
'.places__box'
);

function handleCardSubmit(data) {
  addCardPopup.renderLoading(true);
  api.addCard(data.name, data.link)
  .then((res) => {
    const card = createCard({
      name: res.name,
      link: res.link,
      likes: res.likes,
      id: res._id,
      userId: userId,
      ownerId: res.owner._id,
      avatar: res.avatar
    });
    section.addItem(card);
    addCardPopup.close();
  })
  .catch(console.log)
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
};

const imagePopup = new PopupWithImage('.popup_type_picture');
const addCardPopup = new PopupWithForm('.popup_type_card-add', handleCardSubmit);
const editProfilePopup = new PopupWithForm('.popup_type_profile', submitProfileForm);
const confirmPopup = new PopupWithForm('.popup_type_delete-card');

 function submitEditAvatarForm (avatar) {
  avatarPopup.renderLoading(true);
  
  api.updateAvatar(avatar.link)
  
  .then((res) => {
    
    userInfo.setUserInfo(res.name, res.about, res.avatar);
    
    avatarPopup.close();
  })
  .catch(console.log)
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
 
}  

const avatarPopup = new PopupWithForm('.popup_type_avatar', submitEditAvatarForm);

popupAvatarOpenButton.addEventListener('click', () => { 
  avatarValidator.deactivationButton()
  avatarValidator.resetErrors() 
  avatarPopup.open();
});

section.renderItems();

imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
confirmPopup.setEventListeners();
avatarPopup.setEventListeners();

const userInfo = new UserInfo({
  profileNameSelector: '.profile__title', 
  profileJobSelector: '.profile__subtitle', 
  profileAvatarSelector: '.profile__photo' 
});
