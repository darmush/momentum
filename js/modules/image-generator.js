import { getTimeOfDay } from '../modules/greeting.js';
// import { setBgGitHub } from '../modules/image-slider.js';

let timeOfDay = getTimeOfDay();
let request;

const body = document.querySelector('.body');

// const sourceGit = document.querySelector('.source-git');
const sourceUnsplash = document.querySelector('.source-unsplash');
const sourceFlickr = document.querySelector('.source-flickr');

const languageButtonActtive = document.querySelector('.language-button-active');


export async function setBgAPI() {
    request = document.querySelector('.image-source-input').value
    if (request === '') {
        request = timeOfDay;
    }
    let url
    if (sourceUnsplash.classList.contains('source-button-active')) {
        url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${request}&client_id=Zdwm8kUy5U3_j9A2JHv4OUfKfO9Z8MS6n3nCIvuHemA`;
    } else if (sourceFlickr.classList.contains('source-button-active')) {
        url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=94b905bd2a4a14af65b1c8069020888a&tags=${request}&extras=url_l&format=json&nojsoncallback=1`
    }
    try {
        const res = await fetch(url);
        const data = await res.json();
        const img = new Image();
        if (sourceUnsplash.classList.contains('source-button-active')) {
            img.src = data.urls.regular;
        } else if (sourceFlickr.classList.contains('source-button-active')) {
            img.src = data.photos.photo[createRandomNumber(0, (data.photos.photo).length)]['url_l'];
        }
        img.onload = () => {
           body.style.backgroundImage = `url('${img.src}')`;
        };
    } catch (error) {
        console.log(error)
        document.querySelector('.image-source-input').value = '';
        if (languageButtonActtive.getAttribute('data-language') == 'ru') {
            document.querySelector('.image-source-input').placeholder = '[Ошибка. Введите другой тег]'
        } else {
            document.querySelector('.image-source-input').placeholder = '[Error. Enter another tag]'
        }
    }
}

function createRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
