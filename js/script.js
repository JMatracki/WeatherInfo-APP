const downloadWeatherBtn = document.querySelector("#downloadWeather");
const weatherInput = document.querySelector("#weatherInput");
const weatherInfoDiv = document.querySelector("#weatherInfoContainer");
const city = document.querySelector("#city");
const temperatureDivElement = document.querySelector("#temperature");
const temperatureFilled = document.querySelector("#temperatureFilled");
const windSpeed = document.querySelector("#windSpeed");
const pressure = document.querySelector("#pressure");
const errorMessage = document.querySelector("#errorMessage");
const icon = document.querySelector("#icon");
const weatherDescription = document.querySelector("#weatherDescription");

const getWeatherApi = async () => {
  try {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + weatherInput.value + '&appid=dba3cbbbe22de845daba54e9ad2c2c0b&units=metric&lang=PL');
    if (!response.ok) {
      throw 'Connection Failed';
    }
    return await response.json();
  }
  catch (error) {
    console.error('Weather fetch error!');
  }
}

const showWeather = async () => {
  const weatherApi = await getWeatherApi();
  if (weatherApi === undefined) {
    weatherInfoDiv.style.display = 'none';
    errorMessage.style.display = "block";
    return document.body.style.backgroundImage = "url('images/backgroundDefault.gif')"
  }

  errorMessage.style.display = "none";

  const weatherMain = weatherApi.main;
  const weatherIcon = weatherApi.weather;

  const weatherKmSpeed = (weatherApi.wind.speed * 3.6).toFixed(2);
  const weatherMsSpeed = weatherApi.wind.speed;

  city.innerText = weatherInput.value[0].toUpperCase() + weatherInput.value.slice(1);
  temperatureDivElement.innerText = 'Temperatura:' + ' ' + weatherMain.temp + '°C';
  temperatureFilled.innerText = `Odczuwalna temperatura: ${weatherMain.feels_like} °C`;
  windSpeed.innerText = `Predkosc wiatru: ${weatherKmSpeed} km/h | ${weatherMsSpeed} m/s`
  pressure.innerText = 'Cisnienie atmosferyczne:' + ' ' + weatherMain.pressure + 'hPa';
  weatherDescription.innerText = 'Opis pogody: ' + weatherIcon[0].description;

  document.body.style.backgroundImage = `url('images/${weatherIcon[0].main.toLowerCase()}.jpg')`

  icon.src = 'http://openweathermap.org/img/wn/' + weatherIcon[0].icon + '@2x.png'
  weatherInfoDiv.style.display = 'grid';

  weatherInput.value = '';
}

downloadWeatherBtn.addEventListener('click', showWeather);