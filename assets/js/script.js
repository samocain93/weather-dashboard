const citySearch = document.getElementById("city-search");
const searchBtn = document.getElementById("search-button");
const clearBtn = document.getElementById("clear-search");
const historyEl = document.getElementById("search-history");
const todayWeatherEl = document.getElementById("weather-today");
const weatherPicEl = document.getElementById("weather-icon");
const currentWindEl = document.getElementById("today-wind-speed");
const currentHumidityEl = document.getElementById("today-humidity");
const forecastEl = document.getElementById("forecast");


// Saving API key variable
var apiKey = "a1fe84e1ab8a4fe1c1aa03d84e6c4570";

var city;

searchBtn.addEventListener("click", grabCity)

function grabCity(event) {
    event.preventDefault();

    var cityName = $("#city-search").val();
    getCityWeather(cityName);

    // var cityName = $("city-search").val()
    // console.log(cityName)
}