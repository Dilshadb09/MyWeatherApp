window.addEventListener("load", function () {
  let city = "Cape Town";
  let apiKey = "955a5bb061o7c49atc55346dc6fff582";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
  displayTemperature(city);
});

function displayTemperature(response) {
  // temperature
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  // city
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  //humidity
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  //wind speed
  let windspeedElement = document.querySelector("#wind-speed");
  let windSpeed = response.data.wind.speed;
  // condition
  let conditionElement = document.querySelector("#condition");
  let condition = response.data.condition.description;
  //weather icon
  let weatherIconElement = document.querySelector("#icon");
  let weatherIcon = response.data.condition.icon_url;

  let date = new Date(response.data.time * 1000);
  //print to HTML
  temperatureElement.innerHTML = temperature;
  humidityElement.innerHTML = humidity;
  windspeedElement.innerHTML = windSpeed;
  conditionElement.innerHTML = condition;
  weatherIconElement.src = weatherIcon;
  getForecast(response.data.city);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;
  let apiKey = "955a5bb061o7c49atc55346dc6fff582";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
  displayTemperature(city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "955a5bb061o7c49atc55346dc6fff582";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let forecastHtml = `<div class"row">`;

  response.data.daily.forEach(function (day, index) {
    if (index >= 1 && index < 6) {
      let nextDay = new Date();

      forecastHtml += `
 <div class="row">
            <div class="col-2">
              <div class="weather-forecast-date">${formatDay(day.time)}</div>
              <img 
                src="${day.condition.icon_url}"
                alt=""
                class="weather-forecast-icon"
              />
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">${Math.round(
                  day.temperature.maximum
                )}º</span> ⁃
                <span class="weather-forecast-temperature-min">${Math.round(
                  day.temperature.minimum
                )}º</span>
              </div>
            </div>
              `;
    }
  });
  forecastHtml = forecastHtml + "</div>";
  let forecastElement = document.querySelector("#forecast");

  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

displayForecast();
