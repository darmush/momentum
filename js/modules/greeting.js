const greeting = document.querySelector('.greeting');

export function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    let timeOfDay;

    hours >= 22 && hours < 6 ? timeOfDay = 'night' :
    hours >= 6 && hours < 12 ? timeOfDay = 'morning' :
    hours >= 12 && hours < 17 ? timeOfDay ='afternoon' : timeOfDay = 'evening';
    return timeOfDay;
}

import  dataTranslation  from "./translate.js";

export function showGreeting() {
    const languageButtonActtive = document.querySelector('.language-button-active');
    const greetingText = `Good ${getTimeOfDay()}`;
    if (languageButtonActtive.getAttribute('data-language') == 'ru') {
        greeting.textContent = dataTranslation[`${greetingText}`]
    } else {
        greeting.textContent = greetingText;
    }
}

function setLocalStorage() {
    let name = document.querySelector('.name');
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    let name = document.querySelector('.name');
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage);

export default greeting;
