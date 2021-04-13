const searchFormEl = document.querySelector("#searchForm");
const cityNameEl = document.querySelector("#cityName");
const cityHeaderEl = document.querySelector("#cityHeader");
const iconEl = document.querySelector("#icon");
const API_KEY = "4c0d1ff88d39495632646a9e2c21be66";

const formSubmitHandler = (event) => {
  event.preventDefault();

  var cityName = cityNameEl.value.trim();

  if (cityName) {
    getCity(cityName);
    // forecastData(cityName);
    cityHeaderEl.textContent = "";
    cityNameEl.value = "";
  } else {
    console.log("Select a city");
  }
};

const getCity = (city) => {
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

const displayCityData = function (data) {
  if (data.length === 0) {
    repoContainerEl.textContent = "No datas found.";
    return;
  }
  var dataIcon = data.weather[0].icon;
  console.log(dataIcon);
  var iconUrl = `https://openweathermap.org/img/wn/${dataIcon}.png`;
  $("#icon").html("<img src=" + iconUrl + ">");
  cityHeaderEl.innerHTML = `${data.name}, ${dayjs().format("D MMM YY")}`;
  document.querySelector("#temperature").innerHTML = data.main.temp + "&deg;C";
  document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
  document.querySelector("#windspeed").innerHTML = data.wind.speed + "kph";
};

// const forecastData = function (city) {
//   var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?id=${city}"&appid="${API_KEY}`;
//   $.ajax({
//     url: apiUrl,
//     method: "GET",
//   }).then(function (response) {
//     for (i = 0; i < 5; i++) {
//       var date = new Date(
//         response.list[(i + 1) * 8 - 1].dt * 1000
//       ).toLocaleDateString();
//       var iconcode = response.list[(i + 1) * 8 - 1].weather[0].icon;
//       var iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
//       var tempK = response.list[(i + 1) * 8 - 1].main.temp;
//       var tempF = ((tempK - 273.5) * 1.8 + 32).toFixed(2);
//       var humidity = response.list[(i + 1) * 8 - 1].main.humidity;

//       $("#fDate" + i).html(date);
//       $("#fImg" + i).html("<img src=" + iconurl + ">");
//       $("#fTemp" + i).html(tempF + "&#8457");
//       $("#fHumidity" + i).html(humidity + "%");
//     }
//   });
// };

searchFormEl.addEventListener("submit", formSubmitHandler);
