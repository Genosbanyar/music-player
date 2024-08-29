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
const cancelIcon = document.querySelector(".fa-xmark");
const navList = document.getElementById("menu-list");

const musicList = [
  {
    id: 1,
    title: "Ma Way Tat Chit Chin",
    singer: "N Kai Yar",
    poster: "images/nkaiyar.jpg",
    songId: "music/mawaytatchitchin.mp3",
  },
  {
    id: 2,
    title: "Min Ko Thadi Ya Yin",
    singer: "Kaung & Moh Moh Lwin",
    poster: "images/kaung kaung.jpg",
    songId: "music/minkothadiyayin.mp3",
  },
  {
    id: 3,
    title: "Yin Khone Tan Sone Matt",
    singer: "Gae Gae",
    poster: "images/gaegae.jpg",
    songId: "music/sonemat.m4a",
  },
  {
    id: 4,
    title: "Way Twr Ma",
    singer: "Htet Mon & Yadanar Mai",
    poster: "images/waytwarma.jpg",
    songId: "music/waytwrma.mp3",
  },
  {
    id: 5,
    title: "A Chit Takhu Ko Twae P",
    singer: "Hlwan Paing & Wine Su Khaing Thein",
    poster: "images/winesu.jpg",
    songId: "music/wine su & hlwan paing.mp3",
  },
];

let index = 0;
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

for (let i = 0; i < musicList.length; i++) {
  let musicTitle = musicList[i].title;
  let musicSinger = musicList[i].singer;
  const divOneElement = document.createElement("div");
  divOneElement.classList.add("one");
  const divTwoElement = document.createElement("div");
  divTwoElement.classList.add("music-info");
  const pTag = document.createElement("p");
  pTag.classList.add("music-title");
  let spanTag = document.createElement("span");
  spanTag.classList.add("singers");
  const playTag = document.createElement("i");
  playTag.classList.add("fa", "fa-play");
  //play single song
  playTag.addEventListener("click", () => {
    index = i;
    isPlaying = true;
    playAndPauseButton();
    if (Math.floor(audioTag.currentTime) === 0) {
      loadTrack(index);
    } else {
      audioTag.play();
    }
    playTag.style.display = "none";
    pauseTag.style.display = "inline";
  });
  const pauseTag = document.createElement("i");
  pauseTag.classList.add("fa", "fa-pause");
  pauseTag.addEventListener("click", () => {
    isPlaying = false;
    playTag.style.display = "inline";
    pauseTag.style.display = "none";
    playAndPauseButton();
    audioTag.pause();
  });
  pTag.append(musicTitle);
  spanTag.append(musicSinger);
  divTwoElement.append(pTag, spanTag);
  divOneElement.append(divTwoElement, playTag, pauseTag);
  navList.append(divOneElement);
  totalId.textContent = musicList.length;
}

//load Function
const audioTag = document.createElement("audio");
const loadTrack = (index) => {
  songTitle.textContent = musicList[index].title;
  singer.textContent = musicList[index].singer;
  cover.src = musicList[index].poster;
  audioTag.src = musicList[index].songId;
  audioTag.play();
  setInterval(updateProgressBar, 1000);
  currentId.textContent = index + 1;
};

menuIcon.addEventListener("click", () => {
  navList.classList.add("nav-active");
  menuIcon.style.display = "none";
  cancelIcon.style.display = "inline";
});

cancelIcon.addEventListener("click", () => {
  navList.classList.remove("nav-active");
  menuIcon.style.display = "inline";
  cancelIcon.style.display = "none";
});

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
  let currentTimeSong = Math.floor(audioTag.currentTime);
  if (currentTimeSong === 0) {
    loadTrack(index);
  } else {
    audioTag.play();
  }
});

const nextSong = () => {
  isPlaying = true;
  index += 1;
  if (index === 5) {
    index = 0;
  }
  playAndPauseButton();
  loadTrack(index);
};

nextButton.addEventListener("click", () => {
  nextSong();
});

backButton.addEventListener("click", () => {
  isPlaying = true;
  index -= 1;
  if (index === -1) {
    index = musicList.length - 1;
  }
  playAndPauseButton();
  loadTrack(index);
});

const updateProgressBar = () => {
  progressBar.value = (100 / audioTag.duration) * audioTag.currentTime;
  if (audioTag.ended) {
    nextSong();
  }
};

progressBar.addEventListener("change", () => {
  audioTag.currentTime = progressBar.value * (audioTag.duration / 100);
});
loadTrack(index);
