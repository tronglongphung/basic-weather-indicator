const searchFormEl = document.querySelector("#searchForm");
const cityNameEl = document.querySelector("#cityName");
const cityHeaderEl = document.querySelector("#cityHeader");
// const iconEl = document.querySelector("#icon");
const API_KEY = "4c0d1ff88d39495632646a9e2c21be66";

const formSubmitHandler = (event) => {
  event.preventDefault();

  var cityName = cityNameEl.value.trim();

  if (cityName) {
    getCity(cityName);

    cityHeaderEl.textContent = "";
    cityNameEl.value = "";
  } else {
    console.log("Select a city");
  }
};

const getCity = function (city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Error: ", response.statusText);
      }
    })
    .then(function (data) {
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      displayCityData(data);
      getCoordincate(lat, lon);
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

function getCoordincate(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Error: ", response.statusText);
      }
    })
    .then(function (data) {
      document.querySelector("#uvIndex").innerHTML = data.current.uvi;
      console.log(data);
    })
    .catch(function (error) {
      console.error("Unable to connect to API");
    });
}

var displayCityData = function (data) {
  if (data.length === 0) {
    repoContainerEl.textContent = "No datas found.";
    return;
  }
  //   var dataIcon = data.weather[0].icon;
  //   var iconUrl = `https://openweathermap.org/img/wn/"${dataIcon}"@2x.png`;
  cityHeaderEl.innerHTML = `${data.name}, ${dayjs().format("D MMM YY")}`;

  document.querySelector("#temperature").innerHTML = data.main.temp + "&deg;C";
  document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
  document.querySelector("#windspeed").innerHTML = data.wind.speed + "kph";
};

// // forecast
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid=4c0d1ff88d39495632646a9e2c21be66

searchFormEl.addEventListener("submit", formSubmitHandler);
