import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Отримуємо посилання на форму та радіокнопки
const form = document.querySelector('form');
const delayOption = document.querySelector('input[name="delayOption"]:checked');
const delayInput = document.querySelector('input[name="delayInput"]');

// Функція для створення промісу
function createPromise(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (delayOption.value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

// Обробка події натискання на кнопку "Submit"
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Зупиняємо стандартну поведінку форми

  const delayMilliseconds = parseInt(delayInput.value); // Отримуємо значення затримки в мілісекундах

  createPromise(delayMilliseconds)
    .then(delay => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);
    })
    .catch(delay => {
      console.log(`❌ Rejected promise in ${delay}ms`);
    });
});