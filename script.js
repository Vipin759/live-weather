const apiKey = "820486b53ba66ee82e774cdf87fba375";

document.addEventListener("DOMContentLoaded", () => {
  getWeather("Kotputli");

  document.getElementById("weatherForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const city = document.getElementById("cityInput").value.trim();
    if (city) {
      getWeather(city);
      document.getElementById("cityInput").value = "";
    }
  });
});

async function getWeather(city) {
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl)
    ]);

    if (!currentRes.ok) throw new Error("City not found");

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    const todayStr = forecastData.list[0].dt_txt.split(" ")[0];
    const todayTemps = forecastData.list
      .filter(item => item.dt_txt.startsWith(todayStr))
      .map(item => item.main.temp);

    const minTemp = Math.min(...todayTemps);
    const maxTemp = Math.max(...todayTemps);

    updateUI({
      name: currentData.name,
      country: currentData.sys.country,
      weather: currentData.weather[0],
      temp: currentData.main.temp,
      temp_min: minTemp,
      temp_max: maxTemp,
      feels_like: currentData.main.feels_like,
      humidity: currentData.main.humidity,
      pressure: currentData.main.pressure,
      wind_speed: currentData.wind.speed,
      dt: currentData.dt,
      icon: currentData.weather[0].icon,
    });

  } catch (err) {
    document.getElementById("error-message").textContent = `Error: ${err.message}`;
  }
}

function updateUI({
  name,
  country,
  weather,
  temp,
  temp_min,
  temp_max,
  feels_like,
  humidity,
  pressure,
  wind_speed,
  dt,
  icon
}) {
  document.getElementById("city").textContent = `${name}, ${country}`;

  const dateObj = new Date(dt * 1000);
  const day = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  const date = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  const time = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  document.getElementById("datetime").textContent = `${day}, ${date} at ${time}`;
  document.getElementById("description").textContent = weather.main;
  document.getElementById("icon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  document.getElementById("temp").textContent = `${Math.round(temp)}°C`;
  document.getElementById("min-temp").textContent = `Min: ${Math.round(temp_min)}°C`;
  document.getElementById("max-temp").textContent = `Max: ${Math.round(temp_max)}°C`;
  document.getElementById("feels_like").textContent = `${Math.round(feels_like)}°C`;
  document.getElementById("humidity").textContent = `${humidity}%`;
  document.getElementById("wind").textContent = `${wind_speed} m/s`;
  document.getElementById("pressure").textContent = `${pressure} hPa`;
<<<<<<< HEAD
}  
=======
}
>>>>>>> 6572a73a97861d665b5f4d11927e9e2cf190cf8b
