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

citySearch.onkeyup(function (event){
    event.preventDefault();
    if (event.keyCode === 13){
        
        searchBtn.click(grabCity);
    }
})




function grabCity(event) {
    event.preventDefault();

    var cityName = $("#city-search").val();
    getCityWeather(cityName);
}

// TODO: Create function to get city weather and make api call 


function getCityWeather(cityName) {
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q= "+ cityName + "&appid=" + apiKey + "&units=imperial";

    fetch(queryUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)

        todayWeatherEl.classList.remove("d-none");
        renderCityData(data);
    })

  
}

function renderCityData(data) {
    $('#city-name').text(data.name);
    
    var iconCode = data.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x" + ".png";
    $('#weather-icon').attr('src', iconUrl);

    $('#today-temp').text('Temperature: ' + data.main.temp + ' °F');
    $('#today-wind-speed').text('Wind Speed: ' + data.wind.speed + ' mph');
    $('#today-humidity').text('Humidity: ' + data.main.humidity + '%');


}