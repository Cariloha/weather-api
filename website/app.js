/* Global Variables */

const apiKey = "54bd61f0a7e7ee9f96c427f725b8baab&units=imperial";

/* Select with options */

// document.getElementById("generate").addEventListener("click", performAction);

document.getElementById("generate").addEventListener("click", getData);

async function getData() {
  const country = document.getElementById("country");
  const countryName = country.value;
  const countryCodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${countryName}&limit=5&appid=${apiKey}`;
  const countryResponse = await fetch(countryCodeURL);
  if (!countryResponse.ok) {
    alert("Our database is limited, sorry for the drawbacks");
    throw new Error("Error:", error);
  }
  const countryData = await countryResponse.json();
  // console.log(countryData);
  const countryCode = countryData[0].country;

  const zip = document.getElementById("zip");
  const zipCode = zip.value;
  const geoCodingURL = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${apiKey}`;

  const geoCodingResponse = await fetch(geoCodingURL);
  if (!geoCodingResponse.ok) {
    alert("Our database is limited, sorry for the drawbacks");
    throw new Error("Error:", error);
  }
  const geoCodingData = await geoCodingResponse.json();
  const cityLat = geoCodingData.lat;
  const cityLon = geoCodingData.lon;

  const currentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}`;
  const currentWeatherResponse = await fetch(currentWeather);
  if (!currentWeatherResponse.ok) {
    throw new Error("Error:", error);
  }
  const currentWeatherData = await currentWeatherResponse.json();
  const maxTemp = currentWeatherData.main.temp_max;
  const minTemp = currentWeatherData.main.temp_min;
  const feelsLike = currentWeatherData.main.feels_like;
  const weather = currentWeatherData.weather[0].description;
  // console.log(currentWeatherData);

  const feelings = document.getElementById("feelings");
  const feelingsValue = feelings.value;

  const date = document.getElementById("date");
  const temp = document.getElementById("temp");
  const content = document.getElementById("content");

  date.innerHTML = `<p>${d}</p>`;

  temp.innerHTML = `
    <p>Max. Temperature: ${maxTemp}</p>
    <p>Min. Temperature: ${minTemp}</p>
    <p>Feels like: ${feelsLike}</p>
    <p>${weather}</p>
  `;
  content.innerHTML = `<p>Today you are feeling: ${feelingsValue}</p>`;
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
