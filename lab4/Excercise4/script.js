let lastSearchedCity = null; 

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const loader = document.getElementById('loader');
const weatherDisplay = document.getElementById('weatherDisplay');
const errorMsg = document.getElementById('errorMessage');
const cacheNotice = document.getElementById('cacheNotice');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) fetchWeatherData(city);
});

async function fetchWeatherData(city) {

    errorMsg.textContent = "";
    weatherDisplay.style.display = "none";
    loader.style.display = "block";

    try {

        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found. Please try again.");
        }

        const { latitude, longitude, name } = geoData.results[0];


        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&relative_humidity_2m=true`);
        
        if (!weatherResponse.ok) throw new Error("Weather service unavailable.");
        
        const weatherData = await weatherResponse.json();


        updateUI(name, weatherData);
        

        lastSearchedCity = { name, data: weatherData };
        cacheNotice.textContent = `Last cached search: ${lastSearchedCity.name}`;

    } catch (error) {
        errorMsg.textContent = error.message;
    } finally {
        loader.style.display = "none";
    }
}

function updateUI(cityName, data) {
    const current = data.current_weather;
    
    document.getElementById('displayCity').textContent = cityName;
    document.getElementById('temp').textContent = Math.round(current.temperature);
    document.getElementById('condition').textContent = getWeatherDesc(current.weathercode);
    

    document.getElementById('humidity').textContent = "65"; 
    
    weatherDisplay.style.display = "block";
}


function getWeatherDesc(code) {
    const codes = { 0: "Clear Sky", 1: "Mainly Clear", 2: "Partly Cloudy", 3: "Overcast", 45: "Foggy" };
    return codes[code] || "Cloudy";
}