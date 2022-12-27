import {getTimeOfDay} from '../modules/greeting.js';

const body = document.querySelector('.body');

export function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randomNum = getRandomNum(1, 20).toString().padStart(2, "0");
let timeOfDay = getTimeOfDay();

export function setBgGitHub() {
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/darmush/momentum-backgrounds/main/${timeOfDay}/${randomNum}.jpg`;
    img.onload = () => {      
      body.style.backgroundImage = `url('https://raw.githubusercontent.com/darmush/momentum-backgrounds/main/${timeOfDay}/${randomNum}.jpg')`;
    }; 
}
// setBgGitHub();

let buttonNext = document.querySelector('.slide-next');
function getSlideNext() {
    buttonNext.disabled = true;
    setTimeout(function() { buttonNext.disabled = false; buttonPrev.disabled = false }, 1000);
    randomNum < 20 ?  randomNum = (+randomNum + 1).toString().padStart(2, "0") : randomNum = '01';
    setBgGitHub();
}
buttonNext.addEventListener('click', () => {
    if (sourceUnsplash.classList.contains('source-button-active')) {
        setBgAPI()
    } else if (sourceFlickr.classList.contains('source-button-active')) {
        setBgAPI()
    } else if (sourceGit.classList.contains('source-button-active')) {
        getSlideNext()
    }
});


let buttonPrev = document.querySelector('.slide-prev');
function getSlidePrev() {
    buttonPrev.disabled = true;
    setTimeout(function() { buttonPrev.disabled = false; buttonNext.disabled = false }, 1000);
    randomNum !== '01' ? randomNum = (+randomNum - 1).toString().padStart(2, "0") : randomNum = '20';
    setBgGitHub();
}

const sourceGit = document.querySelector('.source-git');
const sourceUnsplash = document.querySelector('.source-unsplash');
const sourceFlickr = document.querySelector('.source-flickr');
import { setBgAPI } from './image-generator.js';


buttonPrev.addEventListener('click', () => {
    if (sourceUnsplash.classList.contains('source-button-active')) {
        setBgAPI()
    } else if (sourceFlickr.classList.contains('source-button-active')) {
        setBgAPI()
    } else if (sourceGit.classList.contains('source-button-active')) {
        getSlidePrev()
    }
});




