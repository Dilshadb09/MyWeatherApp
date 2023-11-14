function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");

  let apiKey = "955a5bb061o7c49atc55346dc6fff582";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInputElement.value}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}
let city = lisbon;
