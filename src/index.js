let time = document.querySelector("#time");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let hours = now.getHours();
let min = now.getMinutes();

if (hours < 10) hours = "0" + hours;
if (min < 10) min = "0" + min;
time.innerHTML = `${days[now.getDay()]} ${hours} : ${min}`;

let apiKey = "207bd08b168112c4e4ec468910122cee";
let units = "metric";
let city = "New York";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;

  let span = document.querySelector("span");
  span.innerHTML = `${temperature}°C`;

  let status = document.querySelector("#status");
  status.innerHTML = response.data.weather[0].main;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
}

function showCityName(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let search_box = document.querySelector("#search");

  if (search_box.value !== "") {
    h1.innerHTML = search_box.value;

    city = search_box.value;
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showTemperature);
  }
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let h1 = document.querySelector("h1");
h1.innerHTML = city;
axios.get(apiUrl).then(showTemperature);

let search_form = document.querySelector("form");
search_form.addEventListener("submit", showCityName);

let current_Location = document.querySelector("#current_Location");
current_Location.addEventListener("click", showCurrentLocation);
