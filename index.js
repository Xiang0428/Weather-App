const container = document.querySelector(".container");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const search = document.querySelector(".search-box button");
const err404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKEY = "19938f22970e8ec2f56f03722ced876c";

  const city = document.querySelector(".search-box input").value;

  if (city === "") {
    return;
  }
  fetch(
    ` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        console.log(err404);
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        err404.style.display = "block";
        err404.classList.add("fadeIn");
        return;
      }
      err404.style.display = "none";
      err404.classList.remove("fadeIn");

      const imag = document.querySelector(".weather-box img");
      const temperature = document.querySelector(
        ".container .weather-box .temperature"
      );
      const description = document.querySelector(
        ".container .weather-box .description"
      );
      const humidity = document.querySelector(
        ".container .weather-details .humidity span"
      );
      const wind = document.querySelector(
        ".container .weather-details .wind span"
      );
      console.log(data);
      switch (data.weather[0].main) {
        case "Clear":
          imag.src = "./images/clear.png";
          break;

        case "Rain":
          imag.src = "./images/rain.png";
          break;

        case "Snow":
          imag.src = "./images/snow.png";
          break;

        case "Clouds":
          imag.src = "./images/cloud.png";
          break;

        case "Haze":
          imag.src = "./images/mist.png";
          break;

        default:
          imag.src = "";
      }
      console.log(temperature);
      temperature.innerHTML = `${parseInt(
        data.main.temp - 273.15
      )}<span>°C</span>`;
      console.log(description);
      description.innerHTML = `${data.weather[0].description}`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "500px";
    });
});
