

import Notiflix from 'notiflix';
import flatpickr from "flatpickr";

const data = {
  days:document.querySelector("[data-days]"),
  hours:document.querySelector("[data-hours]"),
  minutes:document.querySelector("[data-minutes]"),
  seconds:document.querySelector("[data-seconds]")
}
const noActiveBtn = document.querySelector("[data-start]").setAttribute("disabled", "disabled");

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

 
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

 
  const datetimePicker = flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onChange(selectedDates) {
      const selectedDate = selectedDates[0];

   
      if (selectedDate >= new Date()) {
        document.querySelector("[data-start]").removeAttribute("disabled");
      } else {
        document.querySelector("[data-start]").setAttribute("disabled", "disabled");
        Notiflix.Notify.failure("Please choose a date in the future");
      }
    },
  });

 
  const startButton = document.querySelector("[data-start]");
  startButton.addEventListener("click", () => {
   
    const selectedDate = datetimePicker.selectedDates[0];
  
    const currentDate = new Date();
   
    const timeDifference = selectedDate - currentDate;

   
    const timerInterval = setInterval(() => {
      
      if (new Date() >= selectedDate) {
        clearInterval(timerInterval);       
        return;
      }


      
      const remainingTime = convertMs(selectedDate - new Date());

      data.days.textContent = addLeadingZero(remainingTime.days);
      data.hours.textContent = addLeadingZero(remainingTime.hours);
      data.minutes.textContent = addLeadingZero(remainingTime.minutes);
      data.seconds.textContent = addLeadingZero(remainingTime.seconds);
     
    }, 1000);
  });





