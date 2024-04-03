import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener("DOMContentLoaded", function () {
  const dateTimerPicker = document.getElementById('datetime-picker');
  const startBtn = document.querySelector('[data-start]');
  const timerDays = document.querySelector('[data-days]');
  const timerHours = document.querySelector('[data-hours]');
  const timerMin = document.querySelector('[data-minutes]');
  const timerSec = document.querySelector('[data-seconds]');
  let userSelectedDate;
  startBtn.setAttribute('disabled', 'disabled');
  
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      const currentDate = new Date();
   
      if (userSelectedDate.getTime() < currentDate.getTime()) {
        iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future',
          position: 'topCenter'
        });
        startBtn.setAttribute('disabled', 'disabled');
      } else {
        startBtn.removeAttribute('disabled');
      }
    },
    onChange(selectedDates) {
      userSelectedDate = selectedDates[0];
      const currentDate = new Date();
   
      if (userSelectedDate.getTime() > currentDate.getTime()) {
        startBtn.removeAttribute('disabled');
      } else {
        startBtn.setAttribute('disabled', 'disabled');
      }
    },
  };

  flatpickr(dateTimerPicker, options);

  function addLeadingZero(value) {
    return value < 10 ? '0' + value : value;
  }

  function updateTimer() {
    const currentDate = new Date();
    const difference = userSelectedDate.getTime() - currentDate.getTime();
  
    if (difference <= 0) {
      clearInterval(timerInterval);
      timerDays.textContent = '00';
      timerHours.textContent = '00';
      timerMin.textContent = '00';
      timerSec.textContent = '00';
      iziToast.success({
        title: 'Success',
        message: 'Timer finished!',
        position: 'topCenter'
      });
      return;
    }

    const timeLeft = convertMs(difference);
    timerDays.textContent = addLeadingZero(timeLeft.days);
    timerHours.textContent = addLeadingZero(timeLeft.hours);
    timerMin.textContent = addLeadingZero(timeLeft.minutes);
    timerSec.textContent = addLeadingZero(timeLeft.seconds);
  }

  let timerInterval;

  startBtn.addEventListener('click', function () {
    userSelectedDate = flatpickr.parseDate(dateTimerPicker.value);
    startBtn.setAttribute('disabled', 'disabled');
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
  });
});

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6, minutes: 42, seconds: 20}