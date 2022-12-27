const date = document.querySelector('.date');

export function showDate() {
    const languageButtonActtive = document.querySelector('.language-button-active');
    const day = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    let currentDate;
    let lang;
    if (languageButtonActtive.getAttribute('data-language') == 'ru') {
        lang = 'ru-RU'
    } else {
        lang = 'en-US'
    }
    currentDate = day.toLocaleDateString(lang, options);
    date.textContent = currentDate;
}
showDate()

export default date;