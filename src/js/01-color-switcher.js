const INTERVAL = 1000; // milliseconds

const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');

let setBodyColorInterval;

buttonStart.addEventListener('click', () => {
  // First itteration of chenging backgroundColor
  document.body.style.backgroundColor = getRandomHexColor();

  setBodyColorInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, INTERVAL);

  // Disable start button
  buttonStart.disabled = true;
});

buttonStop.addEventListener('click', () => {
  // Disable the setInterval event
  clearInterval(setBodyColorInterval);

  //Activating the start button
  buttonStart.disabled = false;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
