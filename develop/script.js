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

const apiId = "bce1c0851022d2aa9806bc7732f1bf27";
const currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=";
const fiveDayForecast = "https://api.openweathermap.org/data/2.5/forecast?q=";
let savedSearches = "";
const neededParams = "&APPID=" + apiId + "&units=imperial";
let cityData = document.querySelector(".city-data");
const weatherIconUrl = 'http://openweathermap.org/img/wn/';
let dataList = document.querySelector(".data-list");

//Start Search function: Connects the button and search ID to run the other functions
$(document).ready(function (event) {
  $("#search-button").on("click", function (event) {
    event.preventDefault();

    let searchText = $("#Search-input").val();
    fetchCurrentWeather(searchText);
  });
});

//function for current Weather API Fetch
async function fetchCurrentWeather(searchText) {
  let url = currentWeather + searchText + neededParams;
  let response = await fetch(url);
  renderCurrentWeather(await response.json());
}

function renderCurrentWeather(data) {
  console.log(data);

//Creation of current weather location name
  let location = document.createElement("h2");
  location.setAttribute("class", "return-name")
  let name = data.name;
  location.textContent = name;

  //Creation of current weather date
  let currentDate = document.createElement("h2");
  let date = moment().format("MM/DD/YYYY");
  currentDate.setAttribute("class", "current-date")
  currentDate.textContent = date;

  //Creation of current weather icon
  let currentIcon = document.createElement("img")
  currentIcon.setAttribute("class", "current-icon")
  let icon = data.weather[0].icon;
  currentIcon.src =  weatherIconUrl + icon + ".png";
  let displayIcon = currentIcon.val
  // currentIcon.textContent = weatherIconUrl + icon + ".png";
  
  console.log(icon)
  console.log(currentIcon)

  cityData.append(name + " " + date + " " + displayIcon)

  //creation of current weather temp
  let currentTemp = document.createElement("p");
  currentTemp.setAttribute("class", "return-temp")
  let temp = data.main.temp;
  currentTemp.textContent = "Temperature: " + temp + "F";

  dataList.appendChild(currentTemp);

  //creation of current weather humidity
  let currentHumidity = document.createElement("p");
  currentHumidity.setAttribute("class", "return-humidity");
  let humidity = data.main.humidity;
  currentHumidity.textContent =  "Humidity: " + humidity;

dataList.appendChild(humidity);

//creation of current weather wind speed
  let currentWindSpeed = document.createElement("p");
  currentWindSpeed.setAttribute("class", "return-windspeed");
  let windSpeed = data.main.wind_speed;
  currentWindSpeed.textContent =  "Wind Speed: " + windSpeed + " MPH";

dataList.appendChild(windSpeed);

  console.log(location);
  console.log(humidity);
  console.log(temp);
}

//Tested Code


//function for 5day forecast API Fetch
// function searchFiveDay(){
//     let searchText = $("#Search-input").val();
//     let url = fiveDayForecast + searchText + neededParams;

//     console.log(url)

//     fetch(url)
//         .then(response => response.json()
//         .then(data => console.log(data)));

//         renderFiveDay(data);
// }


  // let location = document.querySelector(".name-title");
  // document.createElement("h1");
  // let name = data.name;
  // location.textContent = name;