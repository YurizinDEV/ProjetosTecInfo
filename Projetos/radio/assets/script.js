const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const likeButton = document.getElementById('like');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');

const voodoo = {
  songName: 'Voodoo',
  artist: 'UCLÃ (feat. Sos, Sueth, Sobs & Duzz)',
  file: 'voodoo',
  liked: false,
};
const mega = {
  songName: 'MEGA AUTOMOTIVO SOLITUDE',
  artist: 'DJ DUCK & MC MORENA',
  file: 'mega',
  liked: true,
};
const ella = {
  songName: "Ella Baila Sola",
  artist: 'Eslabon Armado & Peso Pluma',
  file: 'ella',
  liked: false,
};
const money = {
  songName: 'Money Trees',
  artist: 'Kendrick Lamar & Jay Rock',
  file: 'money',
  liked: false,
};
const idea = {
  songName: 'No Idea',
  artist: 'Don Toliver',
  file: 'idea',
  liked: true,
};
const solitude = {
  songName: "Solitude",
  artist: 'M83 (feat. Felsmann & Tiley)',
  file: 'solitude',
  liked: false,
};
const falling = {
  songName: 'Falling',
  artist: 'Trevor Daniel',
  file: 'falling',
  liked: false,
};
const ladygaga = {
  songName: 'LADY GAGA',
  artist: 'Peso Pluma (feat. Gabito Ballesteros & Junior H)',
  file: 'ladygaga',
  liked: true,
};
const yunk = {
  songName: "Só quando ela me quer",
  artist: 'Yunk Vino (feat. Duzz & Jaya Luuck)',
  file: 'yunk',
  liked: false,
};
const young = {
  songName: "Young, Wild and Free",
  artist: 'Snoop Dogg & Wiz Khalifa (feat. Bruno Mars)',
  file: 'young',
  liked: false,
};
const box = {
  songName: "The Box [Official Lofi Remix]",
  artist: 'Roddy Ricch',
  file: 'box',
  liked: false,
};
let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
const originalPlaylist = JSON.parse(localStorage.getItem('playlist')) ?? [
  voodoo,
  mega,
  ella,
  money,
  idea,
  solitude,
  falling,
  ladygaga,
  yunk,
  young,
  box
];
let sortedPlaylist = [...originalPlaylist];
let index = 0;

function playSong() {
  play.querySelector('.bi').classList.remove('bi-play-circle-fill');
  play.querySelector('.bi').classList.add('bi-pause-circle-fill');
  song.play();
  isPlaying = true;
}

function pauseSong() {
  play.querySelector('.bi').classList.add('bi-play-circle-fill');
  play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
  song.pause();
  isPlaying = false;
}

function playPauseDecider() {
  if (isPlaying === true) {
    pauseSong();
  } else {
    playSong();
  }
}

function likeButtonRender() {
  if (sortedPlaylist[index].liked === true) {
    likeButton.querySelector('.bi').classList.remove('bi-heart');
    likeButton.querySelector('.bi').classList.add('bi-heart-fill');
    likeButton.classList.add('button-active');
  } else {
    likeButton.querySelector('.bi').classList.add('bi-heart');
    likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
    likeButton.classList.remove('button-active');
  }
}

function initializeSong() {
  cover.src = `assets/images/${sortedPlaylist[index].file}.jpg`;
  song.src = `assets/music/${sortedPlaylist[index].file}.mp3`;
  songName.innerText = sortedPlaylist[index].songName;
  bandName.innerText = sortedPlaylist[index].artist;
  likeButtonRender();
}

function previousSong() {
  if (index === 0) {
    index = sortedPlaylist.length - 1;
  } else {
    index -= 1;
  }
  initializeSong();
  playSong();
}

function nextSong() {
  if (index === sortedPlaylist.length - 1) {
    index = 0;
  } else {
    index += 1;
  }
  initializeSong();
  playSong();
}

function updateProgress() {
  const barWidth = (song.currentTime / song.duration) * 100;
  currentProgress.style.setProperty('--progress', `${barWidth}%`);
  songTime.innerText = toHHMMSS(song.currentTime);
}

function jumpTo(event) {
  const width = progressContainer.clientWidth;
  const clickPosition = event.offsetX;
  const jumpToTime = (clickPosition / width) * song.duration;
  song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray) {
  const size = preShuffleArray.length;
  let currentIndex = size - 1;
  while (currentIndex > 0) {
    let randomIndex = Math.floor(Math.random() * size);
    let aux = preShuffleArray[currentIndex];
    preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
    preShuffleArray[randomIndex] = aux;
    currentIndex -= 1;
  }
}

function shuffleButtonClicked() {
  if (isShuffled === false) {
    isShuffled = true;
    shuffleArray(sortedPlaylist);
    shuffleButton.classList.add('button-active');
  } else {
    isShuffled = false;
    sortedPlaylist = [...originalPlaylist];
    shuffleButton.classList.remove('button-active');
  }
}

function repeatButtonClicked() {
  if (repeatOn === false) {
    repeatOn = true;
    repeatButton.classList.add('button-active');
  } else {
    repeatOn = false;
    repeatButton.classList.remove('button-active');
  }
}

function nextOrRepeat() {
  if (repeatOn === false) {
    nextSong();
  } else {
    playSong();
  }
}

function toHHMMSS(originalNumber) {
  let hours = Math.floor(originalNumber / 3600);
  let min = Math.floor((originalNumber - hours * 3600) / 60);
  let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

  console.log('hours: ', hours);

  return `${hours !== 0 ? hours.toString().padStart(2, '0') + ':' : ''}${min
    .toString()
    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTotalTime() {
  totalTime.innerText = toHHMMSS(song.duration);
}

function likeButtonClicked() {
  if (sortedPlaylist[index].liked === false) {
    sortedPlaylist[index].liked = true;
  } else {
    sortedPlaylist[index].liked = false;
  }
  likeButtonRender();
  localStorage.setItem('playlist', JSON.stringify(originalPlaylist));
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
likeButton.addEventListener('click', likeButtonClicked);