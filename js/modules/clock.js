import {showDate} from '../modules/calendar.js';
import {showGreeting} from '../modules/greeting.js';
import {getTimeOfDay} from '../modules/greeting.js';

const time = document.querySelector('.time');

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;

    setTimeout(showTime, 1000);
    
    setTimeout(showDate, 1000);
    setTimeout(showGreeting, 1000);
    setTimeout(getTimeOfDay, 1000);
}
showTime();

export default time;