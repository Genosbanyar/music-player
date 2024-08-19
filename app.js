const currentId = document.getElementById("current-id");
const totalId = document.getElementById("total-id");
const songTitle = document.querySelector(".title");
const singer = document.querySelector(".singer");
const cover = document.getElementsByClassName("poster")[0];
const durationTag = document.getElementsByClassName("duration-time")[0];
const progressBar = document.getElementById("progress");
const backButton = document.getElementsByClassName("fa-backward")[0];
const playButton = document.querySelector(".fa-play");
const nextButton = document.querySelector(".fa-forward");
const pauseButton = document.getElementsByClassName("fa-pause")[0];
const menuIcon = document.querySelector(".fa-bars");
const cancelIcon = document.querySelector(".fa-xmarks");

const musicList = [
  {
    id: 1,
    title: "Ma Way Tat Chit Chin",
    singer: "N Kai Yar",
    poster: "images/1.jpg",
    songId: "music/mawaytatchitchin.mp3",
  },
  {
    id: 2,
    title: "Min Ko Thadi Ya Yin",
    singer: "Kaung & Moh Moh Lwin",
    poster: "images/2.jpg",
    songId: "music/minkothadiyayin.mp3",
  },
  {
    id: 3,
    title: "Yin Khone Tan Sone Matt",
    singer: "Gae Gae",
    poster: "images/3.jpg",
    songId: "music/sonemat.m4a",
  },
  {
    id: 4,
    title: "Way Twr Ma",
    singer: "Htet Mon & Yadanar Mai",
    poster: "images/4.jpg",
    songId: "music/waytwrma.mp3",
  },
  {
    id: 5,
    title: "A Chit Takhu Ko Twae P",
    singer: "Hlwan Paing & Wine Su Khaing Thein",
    poster: "images/5.jpg",
    songId: "music/wine su & hlwan paing.mp3",
  },
];

for (let i = 0; i < musicList.length; i++) {
  let musicTitle = musicList[i].title;
  let musicSrc = musicList[i].songId;
  let coverPoster = musicList[i].poster;
  let currentId = musicList[i].id;
  totalId.textContent = musicList.length;
}

let index = 1;
let isPlaying = false;

pauseButton.addEventListener("click", () => {
  isPlaying = false;
  playAndPauseButton();
  audioTag.pause();
});

const playAndPauseButton = () => {
  if (isPlaying) {
    playButton.style.display = "none";
    pauseButton.style.display = "inline";
  } else {
    playButton.style.display = "inline";
    pauseButton.style.display = "none";
  }
};

//load Function
const audioTag = document.createElement("audio");
const loadTrack = (index) => {
  songTitle.textContent = musicList[index].title;
  singer.textContent = musicList[index].singer;
  cover.src = musicList[index].poster;
  audioTag.src = musicList[index].songId;
  audioTag.play();
  //   durationTag.textContent = ;
  currentId.textContent = index + 1;
};

let createMinuteAndSecond = "00 : 00";
audioTag.addEventListener("loadeddata", () => {
  const totatDuration = Math.floor(audioTag.duration);
  createMinuteAndSecond = totalMinuteAndSecond(totatDuration);
});

audioTag.addEventListener("timeupdate", () => {
  const currentDuration = Math.floor(audioTag.currentTime);
  const currentMinuteAndSecond = totalMinuteAndSecond(currentDuration);
  durationTag.textContent =
    currentMinuteAndSecond + " / " + createMinuteAndSecond;
});

const totalMinuteAndSecond = (totalTime) => {
  const minute = Math.floor(totalTime / 60);
  const second = totalTime % 60;
  const minuteText = minute < 10 ? "0" + minute.toString() : minute;
  const secondText = second < 10 ? "0" + second.toString() : second;
  return minuteText + " : " + secondText;
};

playButton.addEventListener("click", () => {
  isPlaying = true;
  playAndPauseButton();
  loadTrack(index);
});