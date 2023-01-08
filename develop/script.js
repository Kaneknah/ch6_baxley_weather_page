//global variables
let searchResults = $("#search-results");
const apiId = "bce1c0851022d2aa9806bc7732f1bf27";
const currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=";
const fiveDayForecast = "https://api.openweathermap.org/data/2.5/forecast?q=";
const neededParams = "&APPID=" + apiId + "&units=imperial";
const weatherIconUrl = "http://openweathermap.org/img/wn/";
const singleDayParent = $("#single-day-parent");
const fiveDayTitleParent = $("#five-day-title-parent");
const fiveDayParent = $("#five-day-parent");
const savedCityParent = $("#saved-city-parent");

//Start Search function: Connects the button and user input to run the other functions.
$(document).ready(function (event) {
	renderHistory();
	$("#search-button").on("click", function (event) {
		event.preventDefault();
		//run function to remove duplicate elements created.
		removeDuplicates();
		let searchText = $("#search-input").val();
		//if statement for blank search request
		if (!searchText) {
			let errorOnSearch = $("<div></<div>")
				.attr("id", "error-on-search")
				.text("Please enter a City Name into the search bar and press Search.");
			searchResults.append(errorOnSearch);
		} else {
			//fetch weather function and create the search history buttons for local storage
			fetchWeather(searchText);
		}
	});
});

function renderHistory() {
	const localStorageData = { ...localStorage };
	for (const [key] of Object.entries(localStorageData)) {
		renderSearchHistory(String(key));
	}
}

//function for weather API Fetch.applied for single day and 5 day results though awaits.
async function fetchWeather(searchText) {
	removeDuplicates();
	let currentWeatherUrl = currentWeather + searchText + neededParams;
	let fiveDayWeatherUrl = fiveDayForecast + searchText + neededParams;
	let currentWeatherResponse = await fetch(currentWeatherUrl);
	currentWeatherResponse = await currentWeatherResponse.json();
	if (currentWeatherResponse["cod"] === "404") {
		let errorOnSearch = $("<div></<div>")
			.attr("id", "error-on-search")
			.text("Please enter a valid City Name into the search bar.");
		searchResults.append(errorOnSearch);
	} else {
		renderWeather(currentWeatherResponse);
		let fiveDayWeatherResponse = await fetch(fiveDayWeatherUrl);
		renderWeather(await fiveDayWeatherResponse.json());
		createSearchHistory(searchText);
	}
}
//function to display the rendered weather data on the HTML page.
function renderWeather(data) {
	// creates alternative HTML items depending on if the call was a single-day or a 5-day fetch (both are done each fetch)
	if (data["list"]) {
		//five day results
		for (let i = 1; i < 40; i += 8) {
			let fiveDayCard = $("<div></<div>").attr("id", "five-day-card");
			fiveDayParent.append(fiveDayCard);
			currentData = data["list"][i];
			processData(currentData, fiveDayCard);
			// single day results
		}
	} else {
		let singleDayCard = $("<div></<div>").attr("id", "single-day-card");
		singleDayParent.append(singleDayCard);
		processData(data, singleDayCard);
		//title for 5-day results
		let fiveDayTitle = $("<div></<div>")
			.attr("id", "five-day-title")
			.text("5-Day Forecast:");

		fiveDayTitleParent.append(fiveDayTitle);
	}
}
//Processing the API data onto the HTML for both single and 5 day calls.
function processData(data, cardEl) {
	//creating elements for HTML
	let cityData = $("<div></<div>").attr("class", "city-data");

	cardEl.append(cityData);

	let weatherData = $("<div></<div>").attr("class", "weather-data");

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
	currentDateEl.attr("class", "current-date");
	currentDateEl.text(date);

	//Creation of current weather icon
	// http://openweathermap.org/img/wn/01d.png
	let icon = weatherIconUrl + data.weather[0].icon + ".png";
	let displayIconEl = $("<img/>", {
		class: "icon",
		src: icon,
		alt: "Weather icon",
	});

	cityData.append(name + " " + date);
	cityData.append(displayIconEl);

	//creation of current weather temp.
	let temp = data.main.temp;
	let currentTempEl = $("<p></p>")
		.attr("class", "return-temp")
		.text("Temperature: " + temp + " F");

	weatherData.append(currentTempEl);

	//creation of current weather humidity.
	let humidity = data.main.humidity;
	let currentHumidityEl = $("<p></p>")
		.attr("class", "return-humidity")
		.text("Humidity: " + humidity + " %");

	weatherData.append(currentHumidityEl);

	//creation of current weather wind speed.
	let windSpeed = data.wind.speed;
	let currentWindSpeedEl = $("<p></p>")
		.attr("class", "return-wind-speed")
		.text("Wind Speed: " + windSpeed + " MPH");

	weatherData.append(currentWindSpeedEl);
}

//function that creates the search history buttons and aligns them with the event listeners and local storage.
function createSearchHistory(searchText) {
	if (!localStorage.getItem(searchText)) {
		localStorage.setItem(searchText, JSON.stringify(searchText));
		renderSearchHistory(searchText);
	}
}

function renderSearchHistory(searchText) {
	let savedCityBtn = $("<button></button>")
		.addClass("saved-city-btn")
		.text(searchText)
		.attr({
			type: "button",
		})
		.on("click", function (event) {
			fetchWeather(searchText);
		});
	savedCityParent.prepend(savedCityBtn);
}

//function ot guarantee no duplicates are created when specific renders are created.
function removeDuplicates() {
	if ($("#single-day-card")) {
		$("#single-day-parent").empty();
	}
	if ($("#five-day-card")) {
		$("#five-day-parent").empty();
	}
	if ($("#error-on-search")) {
		$("#error-on-search").remove();
	}
	if ($("#five-day-title")) {
		$("#five-day-title").remove();
	}
	if ($(".saved-city-btn")) {
		$("#saved-city-btn").remove();
	}
	if ($("#error-on-search")) {
		$("#error-on-search").remove();
	}
}
