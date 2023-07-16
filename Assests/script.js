var cityInputEl = document.querySelector('#searchBox');
var cityHistoryEl = document.querySelector('#previous-cities');
var weatherInfoEl = document.querySelector('#weather-data');
var searchButtonEl = document.querySelector('button[type="submit"]');
var searchFormEl = document.querySelector('#searchForm');
var previousSearchesEl = document.querySelector('#previous-cities');
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

                function displayWeatherData(todaysDate, cityName, temperature, wind, humidity) {
                    weatherInfoEl.innerHTML = '';
                
                var weatherDaily = document.createElement('div');
                
                var todaysDateEl = document.createElement('p');
                todaysDateEl.textContent = todaysDate; // Fixed typo in property name
                weatherDaily.appendChild(todaysDateEl);

                var cityNameEl = document.createElement('p');
                cityNameEl.textContent = cityName;
                weatherDaily.appendChild(cityNameEl);
            
                var temperatureEl = document.createElement('p');
                temperatureEl.textContent = 'Temperature: ' + temperature + '\u00B0F';
                weatherDaily.appendChild(temperatureEl);
            
                var windEl = document.createElement('p');
                windEl.textContent = 'Wind: ' + wind + ' MPH';
                weatherDaily.appendChild(windEl);
            
                var humidityEl = document.createElement('p');
                humidityEl.textContent = 'Humidity: ' + humidity + '%';
                weatherDaily.appendChild(humidityEl);
            
                
            
                weatherInfoEl.appendChild(weatherDaily);
                };

                function weeklyData(cityName) {
                    var apiKey = 'd94fcd0a3f247519e9f2462c13c0bc86';
                    var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&cnt=40&units=imperial`;
                  
                    fetch(weatherUrl)
                      .then(function (response) {
                        if (response.status === 200) {
                          return response.json();
                        } else {
                          alert('Failed to fetch weather data');
                        }
                      })
                      .then(function (data) {
                        // Filter the data to get one instance per day (e.g., at 12:00 PM)
                        var dailyData = data.list.filter(function (item) {
                          return item.dt_txt.includes('12:00:00');
                        });
                  
                        console.log(dailyData);
                  
                        // Loop through the filtered data and display the daily forecast
                        forecastEl.innerHTML = '';
                        dailyData.forEach(function (day) {
                          var wtemperature = day.main.temp;
                          var wwind = day.wind.speed;
                          var whumidity = day.main.humidity;
                          var wdate = day.dt_txt.split(' ')[0]; // Extract the date from the timestamp
                  
                          console.log(wdate, wtemperature, wwind, whumidity);
                          // Call a new function to display the daily forecast (e.g., displayWeeklyWeatherData)
                          displayWeeklyWeatherData(wdate, wtemperature, wwind, whumidity);
                        });
                      })
                      .catch(function (error) {
                        alert('Error fetching weather data');
                      });
                  }
                
                  var displayWeeklyWeatherData = function (wdate, wtemperature, wwind, whumidity) {
                    
                    
                
                    var weeklyWeather = document.createElement('div');
                
                    var weeklyDateEl = document.createElement('p');
                    weeklyDateEl.textContent = wdate;
                    weeklyWeather.appendChild(weeklyDateEl);
                    
                    var weeklyTemperatureEl = document.createElement('p');
                    weeklyTemperatureEl.textContent = 'Temperature: ' + wtemperature + '\u00B0F';
                    weeklyWeather.appendChild(weeklyTemperatureEl);
                
                    var weeklyWindEl = document.createElement('p');
                    weeklyWindEl.textContent = 'Wind: ' + wwind + ' MPH';
                    weeklyWeather.appendChild(weeklyWindEl);
                
                    var weeklyHumidityEl = document.createElement('p');
                    weeklyHumidityEl.textContent = 'Humidity: ' + whumidity + '%';
                    weeklyWeather.appendChild(weeklyHumidityEl);
                
                    
                
                    forecastEl.appendChild(weeklyWeather);
                    };
                    
                    loadPreviousSearches();
                
                searchFormEl.addEventListener('submit', citySubmitHandler);