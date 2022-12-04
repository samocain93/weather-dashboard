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

//  TODO: Figure out how to get search to trigger when pressing enter here

// citySearch.onkeyup(function (event){
//     event.preventDefault();
//     if (event.keyCode === 13){
        
//         searchBtn.click(grabCity);
//     }
// })

// Funciton to get city value from search box and store in a variable for functions
function grabCity(event) {
    event.preventDefault();

    // copy these to put in the keypress event function
    var cityName = $("#city-search").val();
    getWeather(cityName);
}

// Create function to get city weather and make api call 


// put 5 day call all inside this function to grab everything at once - done



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
    $('#today-wind-speed').text('Wind Speed: ' + data.wind.speed + ' mph');
    $('#today-humidity').text('Humidity: ' + data.main.humidity + '%');


}

// TODO: Make 5 day forecast call and render elements 
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
            
            const index = i * 8 + 3;
            const forecastDate = new Date(data.list[index].dt * 1000);
   
            const forecastDateEl = document.createElement("p");
            forecastDateEl.setAttribute('class', 'mt-3 mb-0 forecast-date');
            forecastDateEl.innerHTML = dayjs(data.list[index].dt_txt).format('MM/DD/YYYY');
            forecastEls[i].innerHTML = forecastDateEl.innerHTML + `<br> <img src="http://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png"> <br> <p>Temperature: ${data.list[index].main.temp} °F</p> `;

        
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
        searchHistoryEl.innerHTML += `<h4>${searchHistory[i]}</h4>`
    }
}

renderSearchHistory();


clearBtn.addEventListener("click", function(){
    localStorage.clear();

})

















// function getForecast(city) {
//     var city = $("#city-search").val();
//     var forecast = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

//     fetch(forecast)
//     .then(function(response) {

//         const forecastEls = document.querySelectorAll(".forecast");
//         for (let i = 0; i < forecastEls.length; i++) {
//             forecastEls[i].innerHTML = "";
//             const index = i * 8 + 4;
//             const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
   
//             const forecastDateEl = document.createElement("p");
//             forecastDateEl.setAttribute('class', 'mt-3 mb-0 forecast-date');
//             forecastDateEl.innerHTML = response.data.list[index].dt_txt;
   
   
//        }
//     })
// }









    //     return response.json()
    // })
    // .then(function(data){
    //     renderForecast(data);
    //     console.log(data)
    // })




// come back to this
//  function renderForecast() {

//      const forecastEls = document.querySelectorAll(".forecast");
//      for (let i = 0; i < forecastEls.length; i++) {
//          forecastEls[i].innerHTML = "";
//          const index = i * 8 + 4;
//         //  const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);

//          const forecastDateEl = document.createElement("p");
//          forecastDateEl.setAttribute('class', 'mt-3 mb-0 forecast-date');
//          forecastDateEl.innerHTML = response.data.list[index].dt_txt;


//     }
// 

