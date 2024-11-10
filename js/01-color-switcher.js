// Selectăm butoanele folosind atributele data
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

// Variabilă pentru a stoca intervalul
let colorInterval = null;

// Funcție pentru a genera o culoare aleatorie
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

// Funcție pentru a începe schimbarea culorii
function startColorSwitch() {
  // Dezactivăm butonul Start
  startButton.disabled = true;

  // Începem schimbarea culorii o dată pe secundă
  colorInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

// Funcție pentru a opri schimbarea culorii
function stopColorSwitch() {
  // Oprim intervalul de schimbare a culorii
  clearInterval(colorInterval);
  colorInterval = null;
  
  // Activăm butonul Start
  startButton.disabled = false;
}

// Adăugăm evenimentele click pentru butoane
startButton.addEventListener('click', startColorSwitch);
stopButton.addEventListener('click', stopColorSwitch);

