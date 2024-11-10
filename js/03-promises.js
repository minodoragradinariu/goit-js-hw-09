// Selectăm formularul și câmpurile de input
const form = document.querySelector('.form');
const delayInput = form.querySelector('[name="delay"]');
const stepInput = form.querySelector('[name="step"]');
const amountInput = form.querySelector('[name="amount"]');

// Funcția createPromise care va crea un promise
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3; // 70% șanse ca promise-ul să fie rezolvat

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Eveniment pentru submit-ul formularului
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Previne reîncărcarea paginii la trimiterea formularului

  // Obținem valorile introduse de utilizator
  let delay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  // Generăm promise-uri în funcție de numărul specificat de utilizator
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        // Afișăm un mesaj de succes folosind Notiflix
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        // Afișăm un mesaj de eroare folosind Notiflix
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    // Creștem întârzierea pentru următorul promise
    delay += step;
  }
});
