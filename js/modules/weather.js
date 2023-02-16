const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

let city = document.querySelector('.city');

city.value = 'Temirtau';

const errorText = document.querySelector('.weather-error');

let errorLang
let windLang
let humidityLang
let metersLang
let cityNotFound



export async function getWeather() {  
    setLanguage()
    let lang;
    if (document.querySelector('.language-button-active').getAttribute('data-language') == 'ru') {
        lang = 'ru';
    } else {
        lang = 'en';
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=0d589b9bd0667f727dbfb66ed7706869&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 


    if (data.cod == 200) {
        errorText.style = 'display: none';
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.floor(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.innerHTML = `<span class="text-to-translate">${windLang}</span>: ${Math.floor(data.wind.speed)} <span class="text-to-translate">${metersLang}</span>`;
        humidity.innerHTML = `<span class="text-to-translate">${humidityLang}</span>: ${Math.floor(data.main.humidity)}%`;
    } else {
        getErrorMessage()
    }
}
getWeather();

function setLanguage() {
    const languageButtonActtive = document.querySelector('.language-button-active');
    if (languageButtonActtive.getAttribute('data-language') == 'ru') {
        errorLang = 'Ошибка! Мы не нашли город';
        windLang = 'Скорость ветра'
        humidityLang = 'Влажность'
        metersLang = 'м/c'
        cityNotFound = 'Ошибка! Не введен город'
    } else {
        errorLang = 'Error! City not found for';
        windLang = 'Wind speed'
        humidityLang = 'Humidity'
        metersLang = 'm/s'
        cityNotFound = 'Error! City not enter'
    }
}

function getErrorMessage() {
    errorText.style = 'display: block';
    if (city.value === '') {
        errorText.innerHTML = `<span class="text-to-translate">${cityNotFound}</span>`;
    } else {
        errorText.innerHTML = `<span class="text-to-translate">${errorLang}</span> '${city.value}'!`;
    }
    city.value = ''
    temperature.textContent = ``;
    weatherDescription.textContent = ``;
    wind.textContent = ``;
    humidity.textContent = ``;
    weatherIcon.style = 'display: none';
}

function setLocalStorage() {
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if(localStorage.getItem('city')) {
     city.value = localStorage.getItem('city');
    }
    city.value = 'Temirtau';
}
window.addEventListener('load', getLocalStorage);

export function setCity(event) {
    if (event.code == 'Enter') {
        getWeather();
        city.blur();
    }
}

document.addEventListener('DOMContentLoaded', getWeather);

city.addEventListener('keypress', function(event){
    if (event.which === 13){
        event.preventDefault();
        if (city.value == '') {
            getErrorMessage()
        }
    } else {
        getWeather()
    }
});
