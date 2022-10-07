let weather = {
  apiKey: "ecefe2c6fd972ba30686ba0ec650c823",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    if (data.cod == "200") {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").textContent = name;
      document.querySelector(
        ".icon"
      ).src = `https://openweathermap.org/img/wn/${icon}.png`;
      document.querySelector(".description").textContent = description;
      document.querySelector(".temp").textContent = `${temp}°C`;
      document.querySelector(
        ".humidity"
      ).textContent = `Humidity: ${humidity}%`;
      document.querySelector(".speed").textContent = `Wind speed: ${speed}km/h`;
      document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
    } else {
      dataUnSend();
    }
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};
let error = document.querySelector(".error");
document.querySelector(".weather-info button").addEventListener("click", () => {
  weather.search();
  document.querySelector(".search-bar").value = "";
  error.textContent = "";
});

document.querySelector(".search-bar").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    weather.search();
    document.querySelector(".search-bar").value = "";
    error.textContent = "";
  }
});

function dataUnSend() {
  let error = document.querySelector(".error");
  error.textContent = "*Please enter a valid city";
}
