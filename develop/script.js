// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

const apiId = "bce1c0851022d2aa9806bc7732f1bf27"
const currentWeather = "https://api.openweathermap.org/data/2.5/weather?q="
const fiveDayForecast = "https://api.openweathermap.org/data/2.5/forecast?q="
const units = "units=imperial"
let savedSearches = ""
const neededParams = "&APPID=" + apiId + "&" + units;


//Start Search function: Connects the button and search ID to run the other functions
$(document).ready(function(event) {
    let searchText = $("#Search-input").val();

    $("#search-button").on("click", function(event) {
    event.preventDefault();

searchCurrentWeather(searchText);
searchFiveDay(searchText);

$("#Search-input").val("");

    })
})

//function for current Weather API Fetch
function searchCurrentWeather() {
    let searchText = $("#Search-input").val();
    let url = currentWeather + searchText + neededParams;

console.log(searchText)
console.log(url)

    fetch(url) 
        .then(response => {
            return response.json();
        })
        .then((data) => {
            let apiData = data;
        })
console.log(data);
       

}

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

function renderCurrentWeather() {
 let location = document.querySelector(".name-title");
 let name = data.name;
 location.textContent = name

 let currentDate = document.querySelector(".date");
 let date = moment().format();
currentDate.textContent = date;

 let currentTemp = document.querySelector(".temp");
 let temp = data.main.temp;
 currentTemp.textContent = "Temperature: " + temp + "F";

 let currentHumidity = document.querySelector(".humidity");
 let humidity = data.main.humidity;
 currentHumidity.textContent = "Humidity: " + humidity


  console.log(data);
    console.log(location);
    console.log(temp);
}

//  If statements for guarding against failed API fetches?
//     .then(function(response) {
//         if(response.ok) {
//              return response.json().then(function(data) {
//                 console.log(url)})}

