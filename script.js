function getWeatherByCity() {

    const city = document.getElementById("city").value;
    const resultDiv = document.getElementById("result");

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    resultDiv.innerHTML = "Loading...";

    // 🌍 Convert city name to latitude & longitude
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

    fetch(geoUrl)
        .then(response => response.json())
        .then(geoData => {

            if (!geoData.results) {
                resultDiv.innerHTML = "City not found!";
                return;
            }

            const lat = geoData.results[0].latitude;
            const lon = geoData.results[0].longitude;
            const cityName = geoData.results[0].name;
            const country = geoData.results[0].country;

            // ☁ Get weather data
            const weatherUrl =
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

            return fetch(weatherUrl)
                .then(response => response.json())
                .then(weatherData => {

                    const temp = weatherData.current_weather.temperature;
                    const wind = weatherData.current_weather.windspeed;

                    resultDiv.innerHTML = `
                        <h2>${cityName}, ${country}</h2>
                        <p>🌡 Temperature: <b>${temp} °C</b></p>
                        <p>💨 Wind Speed: <b>${wind} km/h</b></p>
                    `;
                });

        })
        .catch(() => {
            resultDiv.innerHTML = "Error fetching data!";
        });
}