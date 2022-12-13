
var apiId = "bce1c0851022d2aa9806bc7732f1bf27"
var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q="
var fiveDayForecast = "https://api.openweathermap.org/data/2.5/forecast?q="
var units = "units=imperial"
var savedSearches = ""
var neededParams = "&APPID=" + apiId + "&" + units;


//Start Search function: Connects the button and search ID to run the other functions
$(document).ready(function(event) {
    var searchText = $("#Search-input").val();

    $("#search-button").on("click", function(event) {
    event.preventDefault();

searchCurrentWeather(searchText);
searchFiveDay(searchText);

$("#Search-input").val("");

    })
})

//function for current Weather API Fetch
function searchCurrentWeather() {
    var searchText = $("#Search-input").val();
var url = currentWeather + searchText + neededParams;
console.log(searchText)
console.log(url)

fetch(url) 
.then(response => response.json()
.then(data => console.log(data)));
}

//function for 5day forecast API Fetch
function searchFiveDay(){
    var searchText = $("#Search-input").val();
    var url = fiveDayForecast + searchText + neededParams;
    console.log(url)
    
    fetch(url)
    .then(response => response.json()
    .then(data => console.log(data)));
}


//  If statements for guarding against failed API fetches?
//     .then(function(response) {
//         if(response.ok) {
//              return response.json().then(function(data) {
//                 console.log(url)})}

