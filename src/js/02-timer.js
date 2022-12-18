// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('input#datetime-picker'),

  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),

  daysField: document.querySelector('[data-days]'),
  hoursField: document.querySelector('[data-hours]'),
  minutesField: document.querySelector('[data-minutes]'),
  secondsField: document.querySelector('[data-seconds]'),
};

refs.buttonStart.disabled = true;

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
      refs.buttonStart.disabled = true;
      Notify.failure('Please choose a date in the future');
      return;
    }

    refs.buttonStart.disabled = false;

    refs.buttonStart.addEventListener('click', function () {
      if (!userDate) return;

      refs.buttonStart.disabled = true;
      let timeInterval = setInterval(() => {
        const deltaTime = userDate - getTimeNow();

        if (deltaTime < 0) return clearDOM();

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
        stopButtonStyle();

        setTimeout(() => {
          refs.buttonStop.addEventListener('click', () => {
            refs.buttonStart.disabled = false;
            clearInterval(timeInterval);
            clearTimeout(timeOut);

            dateNow = null;
            userDate = null;
            deltaTime = null;

            clearDOM();
            stopButtonStyle();
          });
        });
      }
    });
  },
};

const pickedTime = flatpickr(refs.input, options);

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
  refs.daysField.innerHTML = days;
  refs.hoursField.innerHTML = hours;
  refs.minutesField.innerHTML = minutes;
  refs.secondsField.innerHTML = seconds;
}

function clearDOM() {
  refs.daysField.innerHTML = '00';
  refs.hoursField.innerHTML = '00';
  refs.minutesField.innerHTML = '00';
  refs.secondsField.innerHTML = '00';
  pickedTime.clear();
}

function stopButtonStyle() {
  refs.buttonStop.classList.toggle('active');
}
