
var apiId = "bce1c0851022d2aa9806bc7732f1bf27"
var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q="
var fiveDayForecast = "https://api.openweathermap.org/data/2.5/forecast?q="
var units = "units=imperial"
var searchText = $("#Search-input").val();
var savedCities = ""
var neededParams = "&APPID=" + apiId + "&" + units;


//Start Search function: Connects the button and search ID to run the other functions
$(document).ready(function() {
    $("#search-button").on("click", function() {

searchCurrentWeather(searchText);
searchFiveDay(searchText);

// $("#Search-input").val("");

    })
})

//function for current Weather
function searchCurrentWeather() {
var url = currentWeather + searchText + neededParams;
console.log(url)

fetch(url) 
.then(response => response.json()
.then(data => console.log(data)));
}

//finding a 5 day forecast for input city
// function searchFiveDay(){
//     var url = fiveDayForecast + searchText + neededParams;
//     console.log(url)
    
//     fetch(url)
//     .then(response => response.json()
//     .then(data => console.log(data)));
// }



//     .then(function(response) {
//         if(response.ok) {
//              return response.json().then(function(data) {
//                 console.log(url)})}

