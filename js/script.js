const downloadWeatherBtn = document.querySelector("#downloadWeather");
const weatherInput = document.querySelector("#weatherInput");
const weatherInfoDiv = document.querySelector("#weatherInfoContainer");
const city = document.querySelector("#city");
const temperature = document.querySelector("#temperature");
const temperatureFilled = document.querySelector("#temperatureFilled");
const windSpeed = document.querySelector("#windSpeed");
const pressure = document.querySelector("#pressure");
const errorMessage = document.querySelector("#errorMessage");
const icon = document.querySelector("#icon");
const weatherDescription = document.querySelector("#weatherDescription");

errorMessage.style.display = "none";

const getWeatherApi = async () => {
  try {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + weatherInput.value + '&appid=dba3cbbbe22de845daba54e9ad2c2c0b&units=metric&lang=PL');
    if (!response.ok) {
      throw 'Connection Failed';
    }
    const data = await response.json();
    return data;
  }
  catch (error) {
  }
}

const showWeather = async () => {
  const weatherApi = await getWeatherApi();
  if (weatherApi === undefined) {
    weatherInfoDiv.style.display = 'none';
    errorMessage.style.display = "block";
    document.body.style.backgroundImage = "url('images/backgroundDefault.jpg')"
    return errorMessage.innerText = "Blednie wpisana miejscowosc"
  }

  const weatherMain = weatherApi.main;
  const weatherWind = weatherApi.wind;
  const weatherIcon = weatherApi.weather;

  city.innerText = weatherInput.value[0].toUpperCase() + weatherInput.value.slice(1);
  temperature.innerText = 'Aktualna temperatura:' + ' ' + weatherMain.temp + '°C';
  temperatureFilled.innerText = 'Aktualna odczuwalna temperatura:' + ' ' + weatherMain.feels_like + '°C';
  windSpeed.innerText = 'Predkosc wiatru:' + ' ' + (weatherWind.speed * 3.6).toFixed(2) + 'km/h' + " | " + weatherWind.speed + 'm/s'
  pressure.innerText = 'Cisnienie atmosferyczne:' + ' ' + weatherMain.pressure + 'hPa';
  weatherDescription.innerText = 'Opis pogody: ' + weatherIcon[0].description;

  document.body.style.backgroundImage = `url('images/${weatherIcon[0].main.toLowerCase()}.jpg')`

  icon.src = 'http://openweathermap.org/img/wn/' + weatherIcon[0].icon + '@2x.png'
  weatherInfoDiv.style.display = 'grid';

  weatherInput.value = '';
}

downloadWeatherBtn.addEventListener('click', showWeather);