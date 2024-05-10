const API_URL = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=55.5&lon=37.5'; // URL для получения погоды в Москве
const WEATHER_CONTAINER = document.getElementById('weather-data');

fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        const timeseries = data.properties.timeseries; // Получаем массив с данными о погоде на разные промежутки времени

        // Фильтруем массив, оставляя только данные о погоде около 14:00 каждого дня
        const dailyTemperatures = timeseries.filter(entry => {
            const time = new Date(entry.time);
            return time.getHours() === 14;
        });

        // Теперь у нас есть массив с данными о погоде на каждый день около 14:00
        // Можем обновить содержимое на странице, выводя эту информацию
        dailyTemperatures.forEach(entry => {
            const time = new Date(entry.time);
            const temperature = entry.data.instant.details.air_temperature;
            const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
            const formattedDate = time.toLocaleDateString('ru-RU', dateOptions);
            const markup = `<p>Температура в Москве на ${formattedDate}: ${temperature}°C</p>`;
            WEATHER_CONTAINER.insertAdjacentHTML('beforeend', markup);
        });
    })
    .catch(error => {
        console.error('Ошибка получения данных:', error);
    });
