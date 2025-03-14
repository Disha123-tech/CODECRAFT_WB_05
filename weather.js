const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeather API key

// Function to fetch weather by city name
async function getWeather() {
    const location = document.getElementById('locationInput').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Location not found or invalid');
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weather').textContent = error.message;
    }
}

// Function to fetch weather by current location
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Unable to fetch weather for your location');
                const data = await response.json();
                displayWeather(data);
            } catch (error) {
                document.getElementById('weather').textContent = error.message;
            }
        });
    } else {
        document.getElementById('weather').textContent = "Geolocation is not supported by this browser.";
    }
}

// Function to display weather data on the page
function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Condition: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}
