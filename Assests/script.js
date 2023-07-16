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

        cities.forEach(function (city) {
            var cityBtn = document.createElement('button');
            cityBtn.textContent = city;
            cityBtn.classList.add('previous-search-btn');
            cityBtn.addEventListener('click', function () {
                weatherData(city);
                
            });
            previousSearchesEl.appendChild(cityBtn);
            });
        }

        var citySubmitHandler = function (event) {
            event.preventDefault();
          
            var cityName = capitalizeFirstLetter(cityInputEl.value.trim());
            console.log(cityName);
            if (cityName) {
            weatherData(cityName);
            cityInputEl.value = '';
            } else {
              alert('Please enter a city');
            }
            };

            function weatherData(cityName){
                var apiKey = '3d3ea1abe7ae02576c706c0260592e5c';
                var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
                fetch(weatherUrl)
                .then(function (response) {
                if (response.status === 200) { 
                    saveCity(cityName);
                        loadPreviousSearches();
                return response.json();
                    } else {
                alert('Failed to fetch weather data');
                }
                })
                .then(function (data) {
                var timestamp = data.dt;
                var date = new Date(timestamp * 1000);
                var todaysDate = date.toISOString().split('T')[0];
                var temperature = data.main.temp;
                var wind = data.wind.speed;
                var humidity = data.main.humidity;
                    console.log(temperature, wind, humidity);
                displayWeatherData(todaysDate, cityName, temperature, wind, humidity);
                    weeklyData(cityName);
                })
                    .catch(function (error) {
                alert('Error fetching weather data');
                });
                };
