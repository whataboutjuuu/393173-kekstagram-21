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
    description: `Description will be here`,
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
