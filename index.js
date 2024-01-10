const apiKey = "1cd2e4263cd9ce53761e90e63e9cdcfe";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".icon");

function updateClock() {
  var now = new Date();
  var day = now.getDay();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var month = setMonth(now.getMonth());
  var date = now.getDate() + " " + month + ", " + now.getFullYear();
  var time =
    hours + " : " + addZero(minutes) + " : " + addZero(seconds) + " hrs IST";

  document.querySelector(".day").innerHTML = setDay(day);
  document.querySelector(".date").innerHTML = date;
  document.querySelector(".time").innerHTML = time;

  setTimeout(updateClock, 100); // Update every millisecond
}

// Function to add zero padding to numbers less than 10

// Start the clock
updateClock();

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status == 404) {
    alert("Enter valid city Name");
  } else {
    var data = await response.json();
    document.querySelector(".city").innerHTML =
      data.name + ", " + getCountry(data.sys.country);

    document.querySelector(".min-temp").innerHTML =
      Math.round(data.main.temp_min) + "°C";
    document.querySelector(".max-temp").innerHTML =
      Math.round(data.main.temp_max) + "°C";
    document.querySelector(".lat").innerHTML = data.coord.lat.toFixed(2);
    document.querySelector(".long").innerHTML = data.coord.lon.toFixed(2);
    document.querySelector(".sunrise").innerHTML = timeConverter(
      data.sys.sunrise
    );
    document.querySelector(".sunset").innerHTML = timeConverter(
      data.sys.sunset
    );
    document.querySelector(".desc").innerHTML = data.weather[0].description;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/hr";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "./images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "./images/clear.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "./images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "./images/mist.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "./images/rain.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "./images/snow.png";
    }

    document.querySelector(".weather").style.display = "block";

    document.querySelector(
      ".lastUpdation"
    ).innerHTML = `Last updated on ${dateConverter(data.dt)} hrs IST`;
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
