const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = WEATHER_API_KEY;

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        try {
            const WeatherData = await getWeatherData(city);
            displayWeatherInfo(WeatherData);
        } catch (error) {
            console.error(error);
            displayError(error);
        }
    } else {
        displayError("Please Enter a city");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiUrl);
    // console.log(response);
    if (!response.ok) {
        throw new Error("Could not fetch weather data!");
    }
    return await response.json();
}

function displayWeatherInfo(data) {
    console.log(data);
    const { name: city,
        main: { temp, humidity },
        weather: [{ description, id }] } = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("img");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    // tempDisplay.textContent = `${((temp-273.15)*(9/5)+32).toFixed(1)}°F`;
    // tempDisplay.textContent = `${temp}°K`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descriptionTitleCase = description.charAt(0).toUpperCase() + description.slice(1).toLowerCase()
    descDisplay.textContent = descriptionTitleCase;
    weatherEmoji.src = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

}

function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "./icons/storm-thunder.svg";
        case (weatherId >= 300 && weatherId < 400):
            return "./icons/storm-rain.svg";
        case (weatherId >= 400 && weatherId < 500):
            return "./icons/storm-rain.svg";
        case (weatherId >= 500 && weatherId < 600):
            return "./icons/rainy-weather.svg";
        case (weatherId >= 600 && weatherId < 700):
            return "./icons/snowflake.svg";
        case (weatherId >= 700 && weatherId < 800):
            return "./icons/mist.svg";
        case (weatherId === 800):
            return "./icons/sun-with-face.svg";
        case (weatherId >= 801 && weatherId < 810):
            return "./icons/cloudy-cloud1.svg";
        default:
            return "./icons/question-mark-question.svg";
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}