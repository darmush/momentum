const settingsIcon = document.querySelector('.settings-icon');
const closeIcon = document.querySelector('.close-icon-container')
const blackoutItem = document.querySelector('.blackout');
const popupContainer = document.querySelector('.popup-container');

export function popupHiden() {
    settingsIcon.addEventListener('click', () => {
        settingsIcon.classList.add('settings-icon-invisible');
        blackoutItem.classList.add('blackout-active');
        popupContainer.classList.add('popup_active');
    });
    blackoutItem.addEventListener('click', () => {
        settingsIcon.classList.remove('settings-icon-invisible');
        blackoutItem.classList.remove('blackout-active');
        popupContainer.classList.remove('popup_active');
    });
    closeIcon.addEventListener('click', () => {
        settingsIcon.classList.remove('settings-icon-invisible');
        blackoutItem.classList.remove('blackout-active');
        popupContainer.classList.remove('popup_active');
    });
}
popupHiden();

const checkboxes = document.querySelectorAll('.custom-checkbox');

export function hidenBlock() {
    Array.from(checkboxes).forEach(function(checkbox){
        checkbox.addEventListener('click', function(e) {
            let nameBlock = e.target.id;
            if (checkbox.checked) {
                document.querySelector(`.${nameBlock}`).style.opacity = '1';
            } else {
                document.querySelector(`.${nameBlock}`).style.opacity = '0';
            }

        })
    });
}
hidenBlock()

function setLocalStorage() {
    checkboxes.forEach(el => {
        el.onchange = () => localStorage.setItem(el.id, el.checked);
        el.checked = localStorage.getItem(el.id) === "true";
    })
    reloadCheckboxes()
}
setLocalStorage()

function reloadCheckboxes() {
    Array.from(checkboxes).forEach(function(checkbox){
        let nameBlock = checkbox.id;
        if (!checkbox.checked) {
            document.querySelector(`.${nameBlock}`).style.opacity = '0';
        } else {
            document.querySelector(`.${nameBlock}`).style.opacity = '1';
        }
    })
}

// Выбор языка

import { changeLanguage } from "./translate.js";

const languageButtonEn = document.querySelector('.language-en');
const languageButtonRu = document.querySelector('.language-ru');
const languageButtonActtive = document.querySelector('.language-button-active');

export function chooseLanguages() {
    languageButtonEn.addEventListener('click', () => {
        if (!languageButtonEn.classList.contains('language-button-active')) {
            toggleLanguages(languageButtonEn)
        }
    });
    languageButtonRu.addEventListener('click', () => {
        if (!languageButtonRu.classList.contains('language-button-active')) {
            toggleLanguages(languageButtonRu)
        }
    });
}
chooseLanguages()

function toggleLanguages(language) {
    let lang = language.getAttribute('data-language')

    languageButtonEn.classList.remove('language-button-active');
    languageButtonRu.classList.remove('language-button-active');
    language.classList.add('language-button-active');

    changeLanguage(lang)
}

// Сохранение в Local Storage выбранный язык

function setLocalStorageLanguage() {
    let activeLanguageButton = document.querySelector('.language-button-active');
    let activeLanguage = activeLanguageButton.getAttribute('data-language')
    localStorage.setItem('language-active', activeLanguage)
}
window.addEventListener('beforeunload', setLocalStorageLanguage);

function getLocalStorageLanguage() {
    if (localStorage.getItem('language-active') !== languageButtonActtive.getAttribute('data-language')) {
        let language = localStorage.getItem('language-active')
        let activeLanguageLocalStorage = document.querySelector(`[data-language="${language}"]`)
        toggleLanguages(activeLanguageLocalStorage)
    }
}
window.addEventListener('load', getLocalStorageLanguage);


// Выбор ресурса для фонового изображения

const sourceGit = document.querySelector('.source-git');
const sourceUnsplash = document.querySelector('.source-unsplash');
const sourceFlickr = document.querySelector('.source-flickr');
const SourceInput = document.querySelector('.image-source-input')
import { setBgGitHub } from "./image-slider.js";
import { setBgAPI } from "./image-generator.js";

const inputImageSource = document.querySelector('.image-source-input')

export function chooseSource() {
    sourceGit.addEventListener('click', () => {
        if (!sourceGit.classList.contains('source-button-active')) {
            toggleSourcesClass(sourceGit);
        }
    });
    sourceUnsplash.addEventListener('click', () => {
        if (!sourceUnsplash.classList.contains('source-button-active')) {
            toggleSourcesClass(sourceUnsplash);
        }
    });
    sourceFlickr.addEventListener('click', () => {
        if (!sourceFlickr.classList.contains('source-button-active')) {
            toggleSourcesClass(sourceFlickr);
        }
    });
}
chooseSource()

function toggleSourcesClass(source) {
    sourceGit.classList.remove('source-button-active');
    sourceUnsplash.classList.remove('source-button-active');
    sourceFlickr.classList.remove('source-button-active');
    source.classList.add('source-button-active');
    SourceInput.style.opacity = '1';
    setBg();
}

inputImageSource.addEventListener('keypress', function(event){
      if (event.which === 13){
          event.preventDefault();
          setBgAPI()
      }
});

function setBg() {
    if (sourceGit.classList.contains('source-button-active')) {
        setBgGitHub()
        SourceInput.style.opacity = '0';
    } else {
        setBgAPI()
    }
}

// Сохранение ключевого слова для фонового изображения в LocalStorage

function setLocalStorageRequest() {
    let request = document.querySelector('.image-source-input');
    localStorage.setItem('image-source-input', request.value);
}
window.addEventListener('beforeunload', setLocalStorageRequest);

function getLocalStorageRequest() {
    let request = document.querySelector('.image-source-input');
    if(localStorage.getItem('image-source-input')) {
        request.value = localStorage.getItem('image-source-input');
    }
}
window.addEventListener('load', getLocalStorageRequest);

// Сохранение выбранного ресурса для фонового изображения в LocalStorage

function setLocalStorageActiveSource() {
    let activeButton = document.querySelector('.source-button-active');
    let activeSource = activeButton.getAttribute('data-source-class')
    localStorage.setItem('active-source-class-name', activeSource);
}
window.addEventListener('beforeunload', setLocalStorageActiveSource);

function getLocalStorageActiveSource() {
    if(localStorage.getItem('active-source-class-name')) {
        let className = localStorage.getItem('active-source-class-name')
        let activeSourceLocalStorage = document.querySelector(`.${className}`)
        toggleSourcesClass(activeSourceLocalStorage);
    } else {
        setBg()
    }
}
window.addEventListener('load', getLocalStorageActiveSource);



