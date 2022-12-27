import data from '../modules/data.json' assert { type: "json" };
import {getRandomNum} from '../modules/image-slider.js';

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const buttonQuote = document.querySelector('.change-quote');
const languageButtonEn = document.querySelector('.language-en');
const languageButtonRu = document.querySelector('.language-ru');
let randomNum;

export function getQuotes() {  
    randomNum = getRandomNum(1, data.length - 1);
    if (languageButtonEn.classList.contains('language-button-active')) {
        quote.textContent = `"${data[randomNum].en.text}"`;
        author.textContent = data[randomNum].en.author;
    } else if (languageButtonRu.classList.contains('language-button-active')) {
        quote.textContent = `"${data[randomNum].ru.text}"`;
        author.textContent = data[randomNum].ru.author;
    }
}
getQuotes();

function getQuoteNext() {
    let currentNum = randomNum;
    getQuotes();
    currentNum == randomNum ? getQuotes() : 0 ;
}
let countAnimateQuoteIcon = 0;
function animateQuoteIcon() {
    countAnimateQuoteIcon += 180;
    buttonQuote.style.rotate = `${countAnimateQuoteIcon}deg`
}

buttonQuote.addEventListener('click', getQuoteNext);
buttonQuote.addEventListener('click', animateQuoteIcon);