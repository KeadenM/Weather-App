var cityInputEl = document.querySelector('#searchBox');
var cityHistoryEl = document.querySelector('#previous-searches');
var weatherInfoEl = document.querySelector('#weather-data');
var searchButtonEl = document.querySelector('#button');
var searchFormEl = document.querySelector('#searchForm');
var previousSearchesEl = document.querySelector('#previous-searches');
var forecastEl = document.querySelector('#weekly-forecast');


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function saveCity(cityName) {
    var cities =JSON.parse(localStorage.getItem('cities')) || [];

    if (!cities.includes(CityName)){
        cities.push(cityName);
        localStorage.setItem('cities', JSON.stringify(cities));
    }}

    function loadPreviousSearches() {
        var cities = JSON.parse(localStorage.getItem('cities')) || [];
        previousSearchesEl.innerHTML = '';
    }
