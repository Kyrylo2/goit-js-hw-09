// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('input#datetime-picker');
const buttonStart = document.querySelector('[data-start]');
buttonStart.disabled = true;
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    let dateNow = getTimeNow();
    let userDate = selectedDates[0].getTime();
    let deltaTime = userDate - dateNow;
    if (deltaTime < 0) {
      buttonStart.disabled = true;
      Notify.failure('Please choose a date in the future');
      return;
    }
    buttonStart.disabled = false;

    buttonStart.addEventListener('click', function () {
      if (!userDate) return;
      console.log(userDate);
      buttonStart.disabled = true;
      let timeInterval = setInterval(() => {
        console.log('1-i am working...');
        const deltaTime = userDate - getTimeNow();

        renderTimer(convertMs(deltaTime));
      }, 1000);

      let timeOut = setTimeout(
        currentInterval => {
          clearInterval(currentInterval);
        },
        deltaTime,
        timeInterval
      );

      if (!document.querySelector('[stop-button]')) {
        createStopButton();
        const stopButton = document.querySelector('[stop-button]');
        setTimeout(() => {
          stopButton.addEventListener('click', () => {
            buttonStart.disabled = false;
            clearInterval(timeInterval);
            clearTimeout(timeOut);

            dateNow = null;
            userDate = null;
            deltaTime = null;

            clearDOM();
            stopButton.remove();
          });
        });
      }
    });
  },
};

const pickedTime = flatpickr(input, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return {
    // If days = 0, then return string "00" to DOM, if less than 10 return function that makes two digits from '0*', else return days.
    days: days === 0 ? '00' : days < 10 ? addLeadingZero(days) : days,
    hours,
    minutes,
    seconds,
  };
}

function getTimeNow() {
  return new Date().getTime();
}

function renderTimer({ days, hours, minutes, seconds }) {
  daysField.innerHTML = days;
  hoursField.innerHTML = hours;
  minutesField.innerHTML = minutes;
  secondsField.innerHTML = seconds;
}

function clearDOM() {
  daysField.innerHTML = '00';
  hoursField.innerHTML = '00';
  minutesField.innerHTML = '00';
  secondsField.innerHTML = '00';
  pickedTime.clear();
}

function createStopButton() {
  const stopButton = document.createElement('button');
  stopButton.setAttribute('stop-button', '');
  stopButton.innerHTML = 'Stop';
  buttonStart.after(stopButton);
}
