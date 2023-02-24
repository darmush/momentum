import { getQuotes } from "./quote.js";
import { getWeather } from './weather.js';

let dataTranslation = {
    'Good night' : 'Доброй ночи,',
    'Good morning' : 'Доброе утро,',
    'Good afternoon' : 'Добрый день,',
    'Good evening' : 'Добрый вечер,',
    'Enter name' : 'Введите имя',
    'Enter city' : 'Введите города',
    'Settings' : 'Настройки',
    'Player' : 'Плеер',
    'Weather' : 'Погода',
    'Time' : 'Время',
    'Date' : 'Дата',
    'Greeting' : 'Приветствие',
    'Quote' : 'Цитата',
    'Application' : 'Приложение',
    'Language' : 'Язык',
    'English' : 'Английский',
    'Russian' : 'Русский',
    'Image source' : 'Источник изображения',
    '[Enter tag]' : '[Введите тег]',
    '[Enter name]' : '[Введите имя]',
    '[Enter city]': '[Введите город]',
    'Error! City not found for' : 'Ошибка! Мы не нашли город',
    'Error! City not enter' : 'Ошибка! Не введен город',
    '[Error. Enter another tag]' : '[Ошибка. Введите другой тег]',
    'Wind speed' : 'Скорость ветра',
    'Humidity' : 'Влажность',
    'm/s' : 'м/c',
}


const textToTranslate = document.querySelectorAll('.text-to-translate')
const placeholders = document.querySelectorAll('.placeholder')

export function changeLanguage(lang) {
    if (lang == 'ru') {
        translateTextToRu(textToTranslate)
        translatePlaceholderToRu()
        getQuotes();
        getWeather();

    }  else if (lang == 'en') {
        translateTextToEn(textToTranslate)
        translatePlaceholderToEn()
        getQuotes();
        getWeather();
    }
}

function translateTextToRu(textArr) {
    textArr.forEach(element => {
        element.textContent = dataTranslation[`${element.textContent}`]
    })
}

function translateTextToEn(textArr) {
    textArr.forEach(element => {
        let textEn = Object.entries(dataTranslation).filter(e => e[1] == `${element.textContent}`)[0][0]
        element.textContent = textEn
    })
}

function translatePlaceholderToRu() {
    placeholders.forEach(element => {
        element.placeholder = dataTranslation[`${element.getAttribute("placeholder")}`]
    })
}

function translatePlaceholderToEn() {
    placeholders.forEach(element => {
        let textEn = Object.entries(dataTranslation).filter(e => e[1] == `${element.getAttribute("placeholder")}`)[0][0]
        element.placeholder = textEn
    })
}

export default dataTranslation;
