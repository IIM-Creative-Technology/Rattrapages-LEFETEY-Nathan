const API_URL = "https://api.weatherapi.com/v1/"
const API_KEY = "ec12d30916fe42d596d194859231906"
let API_CITY = "Paris"
let DAYS_RANGE = 14

const daysSection = document.getElementById('days-data-section')

window.onload = getWeatherData();
async function getWeatherData() {
    await fetch(`${API_URL}forecast.json?key=${API_KEY}&q=${API_CITY}&days=${DAYS_RANGE}&aqi=no&alerts=no`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let days = data.forecast.forecastday
            console.log(days)
            days.forEach(day => {
                console.log(day)
            })
        })
}