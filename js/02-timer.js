// Descris în documentație
import flatpickr from "flatpickr";
// Import suplimentar de stil
import "flatpickr/dist/flatpickr.min.css";

// Selectăm elementele din DOM
const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let selectedDate = null;
let countdownInterval = null;

// Opțiuni pentru flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const pickedDate = selectedDates[0];

    // Verificăm dacă data selectată este în viitor
    if (pickedDate <= new Date()) {
      window.alert("Please choose a date in the future");
      return;
    }

    // Activăm butonul "Start" dacă data este validă
    selectedDate = pickedDate;
    startButton.disabled = false;
  }
};

// Inițializăm flatpickr
flatpickr(datetimePicker, options);

// Funcția pentru conversia milisecundelor
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Funcție pentru a adăuga zero la începutul valorilor
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Funcția pentru a actualiza interfața cronometrului
function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}

// Funcția pentru a porni numărătoarea inversă
function startCountdown() {
  startButton.disabled = true;
  datetimePicker.disabled = true;

  countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = selectedDate - currentTime;

    // Dacă timpul a expirat
    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    // Calculăm și actualizăm afișarea cronometrului
    const timeComponents = convertMs(timeDifference);
    updateTimerDisplay(timeComponents);
  }, 1000);
}

// Evenimentul click pentru a porni cronometrul
startButton.addEventListener('click', startCountdown);
