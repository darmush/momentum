import playList from '../modules/playlist.js';

const playPrevButton = document.querySelector('.play-prev');
const playNextButton = document.querySelector('.play-next');
const playButton = document.querySelector('.play');
let playNum = 0;

// Создвёт плейлист на основе playlist.js
const playListContainer = document.querySelector('.play-list')
export function createPlaylist() {
    playList.forEach(song => {
        const li = document.createElement('li');
        li.classList.add('play-item');
        if (song.artist == '') {
            li.innerHTML = song.title;
        } else {
            li.innerHTML = song.artist + ' - ' + song.title;
        }
        playListContainer.append(li);
    });
}
createPlaylist();

// Задаёт класс активному треку
let audioActive;
export function setAudioActive() {
    let audioItem = document.querySelectorAll('.play-item')[playNum];
    audioItem.classList.add('item-active');
    audioActive = document.querySelector('.item-active');
}
setAudioActive();

// Вписывает в заголовок название активного трека
let titleAudio;
export function setTitleSong() {
    let title = document.querySelector('.song-name');
    titleAudio = audioActive.textContent;
    title.innerText = `${titleAudio}`;
}
setTitleSong();

// Задает продолжительность трека
const durationItem = document.querySelector('.duration');
function setAudioDuration() {
    durationItem.innerText = `${playList[playNum].duration}`;
}
setAudioDuration();



// Функция проигрывания/паузы трека
const audio = new Audio();
let restoreTime = 0;
let isPlay = false;
export function playAudio() {
    setTitleSong();
    setAudioDuration();
    if (!isPlay) {
        audio.src = playList[playNum].file;
        audio.currentTime = restoreTime;
        audio.play();
        toggleBtn();
        getDurationCount()
        setTimer()
        isPlay = true;
    } else {
        audio.pause();
        toggleBtn();
        clearTimeout(setTimer)
        isPlay = false;
        restoreTime = audio.currentTime;
    }
}
playButton.addEventListener('click', playAudio);

// Таймер трека
const timerItem = document.querySelector('.timer');
const progressStatus = document.querySelector('.progress-colored');
function setTimer() {
    let sec = parseInt(audio.currentTime % 60);
    let min = parseInt((audio.currentTime / 60) % 60);
    if (sec < 10) {
        timerItem.innerHTML = min + ':0' + sec;
    }
    else {
        timerItem.innerHTML = min + ':' + sec;
    }
    setTimeout(setTimer, 1000);
    setTimeout(getProgressWidth, 1000);
}



// Вычисление длительности активного трека
let durationCount;
function getDurationCount() {
    let arrMinAndSec = playList[playNum].duration.split(':');
    durationCount = +arrMinAndSec[0] * 60 + +arrMinAndSec[1];
}
getDurationCount();

// Вычисляет ширину прогрессбара
function getProgressWidth() {
    let progressCount = ((Math.round((audio.currentTime / durationCount) * 100)));
    progressStatus.style.width = (progressCount || 0) + '%';
    progressCount >= 100 ? playNext() : 0;
}

// Переключение старта проигрыша по прогрессбару
const progressBar = document.querySelector('.duration-player');
progressBar.addEventListener("click", function(e) {
    let progressValue = e.offsetX;  
    let progressValueWidth = progressValue/(progressBar.offsetWidth);
    // Проверяем, что не вышли за границы времени трека
    if(progressValueWidth > 0 && progressValueWidth < 1) { 
        restoreTime = 0;
        restoreTime = progressValue * durationCount / progressBar.offsetWidth;
        progressStatus.style.width = (((progressValueWidth) * 100) || 0) + '%';
        isPlay = false;
        playAudio();
  }
});



// Переключние иконки кнопки проигрывания/паузы
function toggleBtn() {
    playButton.classList.toggle('pause');
    audioActive.classList.toggle('play-item-pause');
}

// Проигрывание следующего трека
function playNext() {
    restoreTime = 0;
    playNum < (playList.length - 1) ?  playNum = (playNum + 1) : playNum = 0;
    audioActive.classList.remove('item-active', 'play-item-pause');
    playButton.classList.remove('pause');
    setAudioActive();
    isPlay = false;
    playAudio();
}
playNextButton.addEventListener('click', playNext);

// Проигрывание предыдущего трека
function playPrev() {
    restoreTime = 0;
    playNum > 0 ?  playNum = (playNum - 1) : playNum = (playList.length - 1);
    audioActive.classList.remove('item-active', 'play-item-pause');
    playButton.classList.remove('pause');
    setAudioActive();
    isPlay = false;
    playAudio();
}
playPrevButton.addEventListener('click', playPrev);



// Регулирует громкость
const soundVolume = document.querySelector('.sound-volume');
audio.volume = 0.5;
let restoreValue;
soundVolume.addEventListener('input', function() { 
  audio.volume = soundVolume.value;
});

// Включает/выключает звук кнопкой Mute
function muter() {
  if (soundVolume.value == 0) {
    audio.volume = restoreValue;
    soundVolume.value = restoreValue;
    muteButton.style.opacity = 1;
  } else {
    restoreValue = soundVolume.value;
    audio.volume = 0;
    soundVolume.value = 0;
    muteButton.style.opacity = 0.6;
    soundVolume.style.opacity = 0.6;
  }
}

const muteButton = document.querySelector('.mute-button');
muteButton.addEventListener("click", muter); 



const playItemsArray = [...document.querySelectorAll('.play-item')];
playItemsArray.forEach(item => {
    item.addEventListener('click', e => {
        if (isPlay == false) {
            audioActive.classList.remove('item-active', 'play-item-pause');
            playButton.classList.remove('pause');
            playNum = playItemsArray.indexOf(item);
            audioActive = playItemsArray[playNum];
            e.target.classList.add('item-active');
            setAudioActive();
            isPlay = false;
            playAudio();
        } else {
            playAudio();

        }

  });
});


