const citySearch = document.getElementById("city-search");
const searchBtn = document.getElementById("search-button");
const clearBtn = document.getElementById("clear-search");
const historyEl = document.getElementById("search-history");
const todayWeatherEl = document.getElementById("weather-today");
const weatherPicEl = document.getElementById("weather-icon");
const currentWindEl = document.getElementById("today-wind-speed");
const currentHumidityEl = document.getElementById("today-humidity");
const forecastEl = document.getElementById("forecast");
const searchHistoryEl = document.getElementById("search-history");
const newSearchBtn = document.getElementById("new-search-btn");


// Saving API key variable
var apiKey = "a1fe84e1ab8a4fe1c1aa03d84e6c4570";

// var for city
var city;

// gloabl var for search history array
let searchHistory = [];

// event listener on search click to grab city and initialize
searchBtn.addEventListener("click", grabCity);

// Same function as above but set to start when key press enter
citySearch.addEventListener("keypress", function(event){
    
    if (event.key === "Enter"){
    var cityName = $("#city-search").val();
    getWeather(cityName);
    }
});

// Funciton to get city value from search box and store in a variable for functions
function grabCity(event) {
    event.preventDefault();

    // copy these to put in the keypress event function
    var cityName = $("#city-search").val();
    getWeather(cityName);
    // Decide to keep this or not for buttons
    newSearchBtn.classList.remove("d-none");
    clearBtn.classList.remove("d-none");
}



function getWeather(cityName) {
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q= "+ cityName + "&appid=" + apiKey + "&units=imperial";

    fetch(queryUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)

        searchHistory.push(cityName);
        localStorage.setItem("city", JSON.stringify(searchHistory));
        renderSearchHistory();

        todayWeatherEl.classList.remove("d-none");
        renderCityData(data);
        forecastEl.classList.remove("d-none");
        getForecast(city);
        // renderForecast(data);


    })


}

function renderCityData(data) {
    $('#city-name').text(data.name);
    
    var iconCode = data.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x" + ".png";
    $('#weather-icon').attr('src', iconUrl);

    $('#today-temp').text('Temperature: ' + data.main.temp + ' °F');
    $('#today-wind-speed').text('Wind Speed: ' + data.wind.speed + ' MPH');
    $('#today-humidity').text('Humidity: ' + data.main.humidity + '%');


}

// Function call is working and grabbing data

function getForecast(city) {
    var city = $("#city-search").val();
    var forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(forecast)
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
        console.log(data)


        const forecastEls = document.querySelectorAll(".forecast");
        // forecastEls[i].innerHTML = "";
        for (let i = 0; i < forecastEls.length; i++) {
            
            const index = i * 8 + 2;
            // const forecastDate = new Date(data.list[index].dt * 1000);
   
            const forecastDateEl = document.createElement("p");
            forecastDateEl.setAttribute('class', 'mt-3 mb-0 forecast-date');
            forecastDateEl.innerHTML = dayjs(data.list[index].dt_txt).format('MM/DD/YYYY');
            forecastEls[i].innerHTML = forecastDateEl.innerHTML + `<br> <img src="http://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png"> <br> <p>Temperature: ${data.list[index].main.temp} °F</p> ` + `<p>Wind Speed: ${data.list[index].wind.speed} MPH</p>` + `<p>Humidity: ${data.list[index].main.humidity}%</p>`;        
    }

})
}



function renderSearchHistory() {
    var city = localStorage.getItem("city");
    if(city) {
        searchHistory = JSON.parse(city)
    }
    
    searchHistoryEl.innerHTML = "";
    for (let i = 0; i < searchHistory.length; i++) {
        searchHistoryEl.innerHTML += `<input type="text" readonly class="form-control d-block bg-white mb-2" value="${searchHistory[i]}">`
        // searchHistory[i].addEventListener("click", function(){
        //     grabCity(searchHistory.val())
        // })

        //  THis part is not working
        const inputItem = document.querySelector('form[class="form-control"]');

        inputItem.addEventListener("click", function(){
            console.log('hello')
        })
        }
    }
renderSearchHistory();


clearBtn.addEventListener("click", function(){
    localStorage.clear();
    searchHistory = [];
    renderSearchHistory();
})


// TODO: give functionality to new search button to clear local storage and reset to index and new search
// TODO: When clicking items in recent history search, it should render data for that city again. Add event listner for value in each city search item being appended
// TODO: Prevent blank input blocks from rendering to form if no city