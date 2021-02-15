const weatherForm = document.querySelector('#search-form');
const search = document.querySelector('#location-input');
const messageOne = document.querySelector('.message-one');
const messageTwo = document.querySelector('.message-two');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = 'Loading Data';
  messageTwo.textContent = '';

  fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = `Location: ${data.location}`;
        messageTwo.textContent = `Forecast: ${data.forecast}`;
      }
    });
});
