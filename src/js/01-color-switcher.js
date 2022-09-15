const INTERVAL = 1000; // milliseconds

const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
console.log(document.body.style.backgroundColor);

buttonStart.addEventListener('click', () => {
  // First itteration of chenging backgroundColor
  document.body.style.backgroundColor = getRandomHexColor();

  const setBodyColor = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, INTERVAL);

  // Disable start button
  buttonStart.disabled = true;

  // Create the buttonStop event listener
  buttonStop.addEventListener('click', () => {
    // Disable the setInterval event
    clearInterval(setBodyColor);

    //Activating the start button
    buttonStart.disabled = false;
  });
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
