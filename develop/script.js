
var apiId = "bce1c0851022d2aa9806bc7732f1bf27"
var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q="
var fiveDayForecast = "https://api.openweathermap.org/data/2.5/forecast?q="
var units = "units=imperial"
var searchText = ("id", "search-input").val
var savedCities = ""
var neededParams = "&APPID=" + apiId + "&" + units;


// function startSearch(event) {
//     event.preventDefault();

//     }
// //add event listener to button
// if statement for blank search or not readable search
//API search code


//finding a 5 day forecast for input city
function searchFiveDay(query){
    var url = fiveDayForecast + "Missoula" + neededParams;
    console.log(url)
    console.log("hi")
    fetch(url)
}
searchFiveDay()
//     .then(function(response) {
//         if(response.ok) {
//              return response.json().then(function(data) {
//                 console.log(url)})}
// //API search for 5 day data


// .then((response) =>{
//     if (response.ok) {
//         return response.json();
//     }
//     else{
//         throw new Error("NetWork Response Error");
//     }
// })
// .then(data => {
//     console.log(data)
//     displayWeather(data)
// })
// .catch((error)=> console.error("Fetch error:", error));

// function renderCurrentWeather(){
// //API search for current data

// }

// function renderFiveDay(){

// }

// function savedSearches(){

// }

