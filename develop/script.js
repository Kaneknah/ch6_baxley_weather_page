// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions,
// the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, 
//an icon representation of weather conditions, the temperature, 
//the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
let searchResults = document.querySelector("#search-results");
const apiId = "bce1c0851022d2aa9806bc7732f1bf27";
const currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=";
const fiveDayForecast = "https://api.openweathermap.org/data/2.5/forecast?q=";
const neededParams = "&APPID=" + apiId + "&units=imperial";
const weatherIconUrl = 'http://openweathermap.org/img/wn/';
let fiveDayCardParent = document.querySelector("#five-day-parent");
let singleDayCardParent = document.querySelector("#single-day-parent");

//Start Search function: Connects the button and search ID to run the other functions.
$(document).ready(function (event) {
  $("#search-button").on("click", function (event) {
    event.preventDefault();
    if (document.querySelector){

    }
    else{

    
    }
    let searchText = $("#Search-input").val();
    fetchWeather(searchText);
  });
});

//function for current Weather API Fetch.
async function fetchWeather(searchText) {
  let currentWeatherUrl = currentWeather + searchText + neededParams;
  let fiveDayWeatherUrl = fiveDayForecast + searchText + neededParams;

  let currentWeatherResponse = await fetch(currentWeatherUrl);
  renderWeather(await currentWeatherResponse.json());

  let fiveDayWeatherResponse = await fetch(fiveDayWeatherUrl);
  renderWeather(await fiveDayWeatherResponse.json());

}
function renderWeather(data) {

if (data["list"]) {
   console.log(data);
  for (let i = 1; i < 40; i+=8){
    let fiveDayCard = document.createElement("div");
    fiveDayCard.setAttribute("id", "five-day-parent");
    fiveDayCardParent.appendChild(fiveDayCard);
    currentData = data["list"][i];
    processData(currentData, fiveDayCard);
    //create box for single day results
  }
} else {
  let singleDayCard = document.createElement("div");
  singleDayCard.setAttribute("id", "single-day-parent");
  singleDayCardParent.append(singleDayCard);
  processData(data, singleDayCard);
}
 
}
function processData(data, cardEl){

  //creating elements for HTML
  let cityData = document.createElement("div");
  cardEl.appendChild(cityData);
  cityData.setAttribute("class", "city-data");

  let weatherData = document.createElement("div");
  cardEl.appendChild(weatherData);
  weatherData.setAttribute("Class", "weather-data");

  //Creation of current weather location name.
   let location = document.createElement("h2");
  location.setAttribute("class", "return-name");
  let name = data.name ? data.name : "";
  location.textContent = name;

  //Creation of current weather date.
  let currentDateEl = document.createElement("h2");
  let date = data.dt_txt ? data.dt_txt : moment().format("MM/DD/YYYY");
  let whiteSpaceIndex = date.indexOf(" ");
  date = date.slice(0, whiteSpaceIndex);
  currentDateEl.setAttribute("class", "current-date");
  currentDateEl.textContent = date;

  //Creation of current weather icon
  let currentIconEl = document.createElement("img");
  // http://openweathermap.org/img/wn/01d.png
  currentIconEl.setAttribute("class", "current-icon");
  let icon = weatherIconUrl + data.weather[0].icon + ".png";
  currentIconEl.src = icon;

  cityData.append(name + " " + date);
  cityData.append(currentIconEl);

  //creation of current weather temp.
  let currentTempEl = document.createElement("p");
  currentTempEl.setAttribute("class", "return-temp");
  let temp = data.main.temp;
  currentTempEl.textContent = "Temperature: " + temp + "F";

  weatherData.appendChild(currentTempEl);

  //creation of current weather humidity.
  let currentHumidityEl = document.createElement("p");
  currentHumidityEl.setAttribute("class", "return-humidity");
  let humidity = data.main.humidity;
  currentHumidityEl.textContent = "Humidity: " + humidity + " %";

weatherData.appendChild(currentHumidityEl);

//creation of current weather wind speed.
  let currentWindSpeedEl = document.createElement("p");
  currentWindSpeedEl.setAttribute("class", "return-wind-speed");
  let windSpeed = data.wind.speed;
  currentWindSpeedEl.textContent = "Wind Speed: " + windSpeed + " MPH";

weatherData.appendChild(currentWindSpeedEl);
 console.log(data);
}


//Tested Code
// function for 5day forecast API Fetch
// async function fetchFiveDayWeather(searchText){
    
//     console.log(url)

//     fetch(url)
//         .then(response => response.json()
//         .then(data => console.log(data)));

        // renderFiveDay(data);
// }
//function for current Weather API Fetch.
// async function fetchCurrentWeather(searchText) {
//   let url = currentWeather + searchText + neededParams;
//   let response = await fetch(url);
//   renderCurrentWeather(await response.json());
// }


  // let location = document.querySelector(".name-title");
  // document.createElement("h1");
  // let name = data.name;
  // location.textContent = name;