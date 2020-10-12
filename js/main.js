'use strict';

const FEED_LENGTH = 25;

const MESSAGES = [`Всё отлично!`, `В целом всё неплохо. Но не всё.`, `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`, `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`, `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`, `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];
const NAMES = [`Арчи`, `Алекс`, `Амур`, `Айк`, `Айс`, `Арни`, `Анхель`, `Алтaй`, `Альф`, `Арчик`, `Алмаз`, `Абсент`, `Арчибальд`, `Атос`, `Акела`, `Агат`, `Адольф`, `Арчибальт`, `Аякс`, `Амиго`, `Арч`, `Алан`, `Аксель`, `Ангел`, `Азар`, `Альтаир`, `Адам`, `Алай`, `Арнольд`, `Аpчи`, `Август`, `Айрон`, `Акелло`, `Акс`, `Альт`, `Акбар`, `Амурчик`, `Амадей`, `Аргон`, `Арэс`, `Амон`, `Адик`, `Айсон`, `Арго`, `Арон`, `Анчар`, `Арес`, `Атаман`, `Аче`, `Алый`, `Аргус`, `Аид`, `Арагорн`, `Арс`, `Астерикс`, `Алакай`, `Амир`, `Аполон`, `Астин`, `Атай`, `Айро`, `Анри`, `Ареон`, `Агрон`, `Айран`, `Ахилес`, `Али`, `Антей`, `Арамис`, `Арт`, `Атас`, `Альберт`, `Анчи`, `Алек`, `Амулет`, `Антэй`, `Аслан`];

// Helpers
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
  // return Math.round(Math.random() * (max - min) + min);
};
const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
const getShuffledArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

// Create shuffled urls array for img src path
const getUrlsArray = () => {
  const array = [];

  for (let i = 0; i < FEED_LENGTH; i++) {
    array.push(i + 1);
  }

  const urlShuffledArray = getShuffledArray(array);

  return urlShuffledArray;
};
const urlShuffledArray = getUrlsArray();

// Create random number of comments
const createComments = () => {
  const comments = [];
  const numberOfComments = getRandomNumber(1, 5);

  for (let j = 0; j < numberOfComments; j++) {
    comments.push({
      avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
      message: getRandomElement(MESSAGES),
      name: getRandomElement(NAMES)
    });
  }

  return comments;
};

// Create one element of the feed
const createElement = (i) => {
  const feedElement = {
    url: `photos/${urlShuffledArray[i]}.jpg`,
    description: `Photo description`,
    likes: getRandomNumber(15, 200),
    comments: createComments()
  };

  return feedElement;
};

// Collect the feed
const collectFeed = () => {
  let feed = [];

  for (let i = 0; i < FEED_LENGTH; i++) {
    const newElement = createElement(i);

    feed.push(newElement);
  }

  return feed;
};
const feed = collectFeed();

// DOM manipulations
const drawFeed = () => {
  const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
  const picturesContainer = document.querySelector(`.pictures`);
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < FEED_LENGTH; i++) {
    let newPicture = pictureTemplate.cloneNode(true);

    newPicture.querySelector(`.picture__img`).src = feed[i].url;
    newPicture.querySelector(`.picture__comments`).textContent = feed[i].comments.length;
    newPicture.querySelector(`.picture__likes`).textContent = feed[i].likes;

    fragment.appendChild(newPicture);
  }

  picturesContainer.appendChild(fragment);
};

drawFeed();

// show big picture
const bigPicture = document.querySelector(`.big-picture`);
// bigPicture.classList.remove(`hidden`);
const commentContainer = document.querySelector(`.social__comments`);
const comment = commentContainer.querySelector(`.social__comment`);

const cleanContainer = (container) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

const fillBigPicture = (dataFeedElement) => {
  bigPicture.querySelector(`.big-picture__img img`).src = dataFeedElement.url;
  bigPicture.querySelector(`.likes-count`).textContent = dataFeedElement.likes;
  bigPicture.querySelector(`.comments-count`).textContent = dataFeedElement.comments.length;
  bigPicture.querySelector(`.social__caption`).textContent = dataFeedElement.description;

  let commentFragment = document.createDocumentFragment();

  cleanContainer(commentContainer);

  let commentsArray = dataFeedElement.comments;

  for (let i = 0; i < commentsArray.length; i++) {
    let newComment = comment.cloneNode(true);

    newComment.classList.add(`new`);
    newComment.querySelector(`.social__picture`).src = commentsArray[i].avatar;
    newComment.querySelector(`.social__text`).textContent = commentsArray[i].message;

    commentFragment.appendChild(newComment);
  }

  commentContainer.appendChild(commentFragment);
};

fillBigPicture(feed[0]);

// document.querySelector(`.social__comment-count`).classList.add(`hidden`);
// document.querySelector(`.comments-loader`).classList.add(`hidden`);
// document.querySelector(`body`).classList.add(`modal-open`);


// module 4

// open/close Edit modal

const uploadButton = document.querySelector(`#upload-file`);
const closeEditing = document.querySelector(`#upload-cancel`);
const editForm = document.querySelector(`.img-upload__overlay`);
const hashtagInput = document.querySelector(`.text__hashtags`);
const sendButton = document.querySelector(`.img-upload__submit`);
const HASHTAG_TEMPLATE = /^#[A-Za-z\d]*$/;
const HASHTAGS_QTY = 5;
const zoomInButton = document.querySelector(`.scale__control--bigger`);
const zoomOutButton = document.querySelector(`.scale__control--smaller`);
const zoomInput = document.querySelector(`.scale__control--value`);
const imgUploadPreview = document.querySelector(`.img-upload__preview img`);
const effects = document.querySelectorAll(`.effects__item input[type='radio']`);
const effectSlider = document.querySelector(`.img-upload__effect-level`);
const effectLevelLine = effectSlider.querySelector(`.effect-level__line`);
const effectLevelValue = effectSlider.querySelector(`.effect-level__value`);
const effectSliderPin = effectSlider.querySelector(`.effect-level__pin`);

const onPopupEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeEditPopup();
  }
};

const openEditPopup = () => {
  editForm.classList.remove(`hidden`);
  document.querySelector(`body`).classList.add(`modal-open`);
  document.addEventListener(`keydown`, onPopupEscPress);
};

const closeEditPopup = () => {
  editForm.classList.add(`hidden`);
  document.querySelector(`body`).classList.remove(`modal-open`);
  document.removeEventListener(`keydown`, onPopupEscPress);
  uploadButton.value = ``;
};

uploadButton.addEventListener(`change`, function () {
  openEditPopup();
});

closeEditing.addEventListener(`click`, function () {
  closeEditPopup();
});

hashtagInput.addEventListener(`focus`, function () {
  document.removeEventListener(`keydown`, onPopupEscPress);
});
hashtagInput.addEventListener(`blur`, function () {
  document.addEventListener(`keydown`, onPopupEscPress);
});

// zoom-in / zoom-out

let zoomValue = parseFloat(zoomInput.value);
imgUploadPreview.style.transform = `scale( ${zoomValue * 0.01})`;

zoomInButton.addEventListener(`click`, function () {
  zoomValue = zoomValue + 25;
  if (zoomValue > 100) {
    zoomValue = 100;
  }
  zoomInput.value = zoomValue + `%`;
  imgUploadPreview.style.transform = `scale( ${zoomValue * 0.01})`;
});

zoomOutButton.addEventListener(`click`, function () {
  zoomValue = zoomValue - 25;
  if (zoomValue < 25) {
    zoomValue = 25;
  }
  zoomInput.value = zoomValue + `%`;
  imgUploadPreview.style.transform = `scale( ${zoomValue * 0.01})`;
});

// effects
effectSlider.classList.add(`hidden`);
let filterValue;


for (let i = 0; i < effects.length; i++) {
  effects[i].addEventListener(`click`, function () {
    effectSlider.classList.remove(`hidden`);

    imgUploadPreview.className = ``;
    imgUploadPreview.style.filter = ``;

    if (effects[i].value !== `none`) {
      imgUploadPreview.classList.add(`effects__preview--${effects[i].value}`);
      changeEffect(`${effects[i].value}`);
    } else {
      imgUploadPreview.className = ``;
      effectSlider.classList.add(`hidden`);
    }
  });
}

//
const getSliderLevel = (lineWidth, leftWidth) => {
  const sliderLevel = ((leftWidth * 100) / lineWidth) / 100;

  return sliderLevel.toFixed(2);
};

const doEffect = (effect, filterPosition) => {

  switch (effect) {
    case `chrome`:
      imgUploadPreview.style.filter = `grayscale(${filterPosition})`;
      break;
    case `sepia`:
      imgUploadPreview.style.filter = `sepia(${filterPosition})`;
      break;
    case `marvin`:
      filterPosition = `${filterPosition * 100}%`;
      imgUploadPreview.style.filter = `invert(${filterPosition})`;
      break;
    case `phobos`:
      filterPosition = `${Math.round(filterPosition * 3)}px`;
      imgUploadPreview.style.filter = `blur(${filterPosition})`;
      break;
    case `heat`:
      filterPosition = (filterPosition * 3).toFixed(1);
      imgUploadPreview.style.filter = `brightness(${filterPosition})`;
      break;
  }
};

const changeEffect = (effectName) => {
  effectSliderPin.addEventListener(`mouseup`, function (evt) {
    const leftPos = evt.target.offsetLeft;
    filterValue = getSliderLevel(effectLevelLine.offsetWidth, leftPos);
    effectLevelValue.value = filterValue;
    doEffect(effectName, filterValue);
  });
};

// Hashtags
let hashtags = [];


const collectHashtags = (elem) => {
  hashtags = elem.value.trim().toLowerCase().split(` `);

  return hashtags;
};

const validateHashtags = (hashtagsArray) => {
  if (hashtagsArray.length > HASHTAGS_QTY) {
    hashtagInput.setCustomValidity(`нельзя указать больше пяти хэш-тегов`);
    hashtagInput.reportValidity();
    hashtagsArray = hashtagsArray.slice(0, HASHTAGS_QTY);
  }

  for (let i = 0; i < hashtagsArray.length; i++) {

    let findEqualElems = (array) => {
      array = array.filter(function (elem, pos, arr) {
        return pos !== arr.indexOf(elem) || pos !== arr.lastIndexOf(elem);
      });

      return array;
    };

    if (!HASHTAG_TEMPLATE.test(hashtagsArray[i])) {
      hashtagInput.setCustomValidity(`строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.`);
    } else if (hashtagsArray[i].length > 20) {
      hashtagInput.setCustomValidity(`максимальная длина одного хэш-тега 20 символов, включая решётку`);
    } else if (hashtagsArray[i].length === 1 && hashtagsArray[i] === `#`) {
      hashtagInput.setCustomValidity(`хеш-тег не может состоять только из одной решётки`);
    } else if (findEqualElems(hashtagsArray).length > 1) {
      hashtagInput.setCustomValidity(`один и тот же хэш-тег не может быть использован дважды`);
    } else {
      hashtagInput.setCustomValidity(``);
    }
    hashtagInput.reportValidity();
  }
};

hashtagInput.addEventListener(`input`, function (evt) {
  evt.preventDefault();

  hashtags = collectHashtags(evt.target);
});


// validation after Upload button pressed
sendButton.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  validateHashtags(hashtags);
});
