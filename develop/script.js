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

let searchResults = $("#search-results");
const apiId = "bce1c0851022d2aa9806bc7732f1bf27";
const currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=";
const fiveDayForecast = "https://api.openweathermap.org/data/2.5/forecast?q=";
const neededParams = "&APPID=" + apiId + "&units=imperial";
const weatherIconUrl = 'http://openweathermap.org/img/wn/';
const singleDayParent = $("#single-day-parent");
const fiveDayTitleParent = $(".five-day-title-parent");
const fiveDayParent = $("#five-day-parent");
const savedCityParent = $("#saved-city-parent");

//Start Search function: Connects the button and search ID to run the other functions.
$(document).ready(function (event) {
  $("#search-button").on("click", function (event) {
    event.preventDefault();
    //statement to reset search results
    if($("#single-day-card")) {
      $("#single-day-parent").empty();
    }
    if($("#five-day-card")) {
      $("#five-day-parent").empty();
    }
    if($("#error-on-search")) {
      $("#error-on-search").remove();
    }
    if($("#five-day-title")) {
      $(".five-day-title-parent").empty();
    }
    if($(".saved-city-btn")){
     $(".saved-cit-btn").remove();
    }
    let searchText = $("#search-input").val();
    //if statement for blank search request
    if(!searchText){
      let errorOnSearch = $("<div></<div>")
        .attr("id", "error-on-search")
        .text("Please enter a City Name into the search bar and press Search.")

      searchResults.append(errorOnSearch);

    } else {

      fetchWeather(searchText);
      createSearchHistory(searchText);
    }
  });
});

function createSearchHistory(searchText) {
  let savedCityBtn = $('<button></button>')
      .addClass('saved-city-btn')
      .text(searchText)
      .on('click', function (event) {
        console.log(searchText);
        localStorage.setItem(searchResults,searchText );
        console.log(searchResults)
        
      })
      .attr({
         type: 'button'
      });
    
    savedCityParent.prepend(savedCityBtn);
}


// function searchSavedCity(){
//   savedCityBtn.on('click', ready(searchText))
// }


//function for weather API Fetch.
async function fetchWeather(searchText) {
  let currentWeatherUrl = currentWeather + searchText + neededParams;
  let fiveDayWeatherUrl = fiveDayForecast + searchText + neededParams;
  let currentWeatherResponse = await fetch(currentWeatherUrl);
  currentWeatherResponse = await currentWeatherResponse.json();
  if(currentWeatherResponse["cod"] === "404"){
    let errorOnSearch = $("<div></<div>")
      .attr("id", "error-on-search")
      .text("Please enter a valid City Name into the search bar.");

    searchResults.append(errorOnSearch);
      
  } else {
    renderWeather(currentWeatherResponse);
    let fiveDayWeatherResponse = await fetch(fiveDayWeatherUrl);
    renderWeather(await fiveDayWeatherResponse.json());

     let fiveDayTitle = $("<div></<div>")
        .attr("id", "five-day-title")
        .text("5-Day Forecast:");

      fiveDayTitleParent.append(fiveDayTitle);
  }
}

function renderWeather(data) {
 
  if (data["list"]) {
    for (let i = 1; i < 40; i+=8){
      let fiveDayCard = $("<div></<div>")
        .attr("id", "five-day-card");
      fiveDayParent.append(fiveDayCard);
      currentData = data["list"][i];
      processData(currentData, fiveDayCard);

      
    //create box for single day results
  }} else {
    let singleDayCard = $("<div></<div>")
      .attr("id", "single-day-card");
    singleDayParent.append(singleDayCard);
    processData(data, singleDayCard);
}
}

function processData(data, cardEl){
  //creating elements for HTML
  let cityData = $("<div></<div>")
    .attr("class", "city-data");

  cardEl.append(cityData);

  let weatherData = $("<div></<div>")
    .attr("class", "weather-data");

  cardEl.append(weatherData);

  //Creation of current weather location name.
  let name = data.name ? data.name : "";
  let location = $("<h2></<h2>");
  location.attr("class", "return-name");
  location.text(name);
  
  //Creation of current weather date.
  let date = data.dt_txt ? data.dt_txt : moment().format("MM/DD/YYYY");
  let whiteSpaceIndex = date.indexOf(" ");
  date = date.slice(0, whiteSpaceIndex);
  let currentDateEl = $("<h2></<h2>");
    currentDateEl.attr("class", "current-date")
    currentDateEl.text(date);

  //Creation of current weather icon
  // http://openweathermap.org/img/wn/01d.png
  let icon = weatherIconUrl + data.weather[0].icon + ".png";
  let displayIconEl = $("<img/>", {
  class: "icon",
  src: icon,
  alt: "Weather icon"
  });

  cityData.append(name + " " + date);
  cityData.append(displayIconEl);

  //creation of current weather temp.
  let temp = data.main.temp;
  let currentTempEl = $("<p></p>")
    .attr("class", "return-temp")
    .text("Temperature: " + temp + "F");

  weatherData.append(currentTempEl);

  //creation of current weather humidity.
   let humidity = data.main.humidity;
  let currentHumidityEl = $("<p></p>")
    .attr("class", "return-humidity")
    .text( "Humidity: " + humidity + " %");

  weatherData.append(currentHumidityEl);

//creation of current weather wind speed.
let windSpeed = data.wind.speed;
  let currentWindSpeedEl = $("<p></p>")
    .attr("class", "return-wind-speed")
    .text("Wind Speed: " + windSpeed + " MPH");

  weatherData.append(currentWindSpeedEl);
}
