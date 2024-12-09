import { PHOTOS_OBJECTS } from './photos.js';
import { onEscapeKeydown } from './util.js';
const modalWindowElement = document.querySelector('.big-picture');
const bigPilctureCancel = modalWindowElement.querySelector(
  '.big-picture__cancel'
);
const photosContainer = document.querySelector('.pictures.container');
const bigPictureImg = modalWindowElement
  .querySelector('.big-picture__img')
  .querySelector('img');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
let pictureObj = null;

const STEP = 5;
let limit = STEP;

//Создание большой фотки
const createBigPicture = () => {
  bigPictureImg.src = pictureObj.url;

  socialCommentCount.querySelector('.social__comment-total-count').textContent =
    pictureObj.comments.length;
  document.querySelector('.social__caption').textContent =
    pictureObj.description;

  const body = document.querySelector('body');
  body.classList.add('modal-open');

  if (pictureObj.comments.length <= limit) {
    commentsLoader.classList.add('hidden');
    socialCommentCount.querySelector('.social__comment-shown-count').textContent =
      pictureObj.comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
    socialCommentCount.querySelector('.social__comment-shown-count').textContent =
      limit;
  }
};

// Создание комментариев
const createComentsForBigPicture = () => {
  const socialCommentsList = document.querySelector('.social__comments');
  socialCommentsList.innerHTML = '';

  for (let i = 0; i < limit && i < pictureObj.comments.length; i++) {
    const comment = pictureObj.comments[i];

    const socialComment = document.createElement('li');
    socialComment.classList.add('social__comment');

    const socialPicture = document.createElement('img');
    socialPicture.classList.add('social__picture');
    socialPicture.src = comment.avatar;
    socialPicture.alt = 'Аватар комментатора фотографии';
    socialPicture.width = '35';
    socialPicture.height = '35';

    const socialText = document.createElement('p');
    socialText.classList.add('social__text');
    socialText.textContent = comment.message;

    socialComment.appendChild(socialPicture);
    socialComment.appendChild(socialText);
    socialCommentsList.appendChild(socialComment);

    if (pictureObj.comments.length - 1 === i) {
      commentsLoader.classList.add('hidden');
    }
  }
};

//Клик по миниатюре
photosContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('picture__img')) {
    limit = STEP;
    modalWindowElement.classList.remove('hidden');

    const htmlElementId = evt.target.getAttribute('data-picture-id');
    pictureObj = PHOTOS_OBJECTS.find(
      (item) => item.id === Number(htmlElementId)
    );

    createBigPicture();
    createComentsForBigPicture();
  }
});

//Клик по крестику закрытия
bigPilctureCancel.addEventListener('click', () => {
  modalWindowElement.classList.add('hidden');
  const body = document.querySelector('body');
  body.classList.remove('modal-open');
});

//Нажатие на Escape
onEscapeKeydown();

//Клик по кнопке "Загрузить еще..."
commentsLoader.addEventListener('click', () => {
  limit = limit + STEP;
  createComentsForBigPicture();
  createBigPicture();
});
