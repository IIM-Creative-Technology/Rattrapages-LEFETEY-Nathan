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
            let days = data.forecast.forecastday
            console.log(days)
            days.forEach(day => {
                let date                    = day.date

                let dayData                 = day.day
                let minTemp                 = Math.round(dayData.mintemp_c)
                let maxTemp                 = Math.round(dayData.maxtemp_c)
                let condition               = dayData.condition.text

                let hoursData               = day.hour

                let launchData              = hoursData[12]
                let launchCondition         = launchData.condition.text
                let launchTemp              = Math.round(launchData.temp_c)

                let dinnerData              = hoursData[20]
                let dinnerCondition         = dinnerData.condition.text
                let dinnerTemp              = Math.round(dinnerData.temp_c)

                let dayCard = document.createElement('div')
                dayCard.id = `day-${date}`

                let dayCardHeader = document.createElement('header')

                let headerBackgroundImage;
                if (condition.includes('sun') || condition.includes('sunny') || condition.includes('Sun') || condition.includes('Sunny')) { headerBackgroundImage = "sunny"}
                else if (condition.includes('rain') || condition.includes('rainy') || condition.includes('Rain') || condition.includes('Rainy')) { headerBackgroundImage = "rainy"}
                else { headerBackgroundImage = "cloudy"}
                dayCardHeader.classList.add(`bg-${headerBackgroundImage}`)

                let cardConditionTag = document.createElement('span')
                cardConditionTag.innerText = `${condition}`

                dayCardHeader.appendChild(cardConditionTag)


                let dayInfos = document.createElement('div')

                let cardTitle = document.createElement('h3')
                cardTitle.innerText = `${date}`

                let cardTempTag = document.createElement('p')
                cardTempTag.innerText = `${minTemp}°C - ${maxTemp}°C`

                dayInfos.appendChild(cardTitle)
                dayInfos.appendChild(cardTempTag)


                let launchInfos = document.createElement('div')
                let launchInfoAside = document.createElement('aside')

                let launchBackgroundImage;
                if (launchCondition.includes('sun') || launchCondition.includes('sunny') || launchCondition.includes('Sun') || launchCondition.includes('Sunny')) { launchBackgroundImage = "sunny"}
                else if (launchCondition.includes('rain') || launchCondition.includes('rainy') || launchCondition.includes('Rain') || launchCondition.includes('Rainy')) { launchBackgroundImage = "rainy"}
                else { launchBackgroundImage = "cloudy"}
                launchInfoAside.classList.add(`bg-${launchBackgroundImage}`)

                let launchTimeTag = document.createElement('h4')
                launchTimeTag.innerText = `Launch`

                launchInfoAside.appendChild(launchTimeTag)

                let launchInfoDiv = document.createElement('div')
                let launchTempTag = document.createElement('h5')
                launchTempTag.innerText = `${launchTemp}°C - ${launchCondition}`

                launchInfoDiv.appendChild(launchTempTag)

                launchInfos.appendChild(launchInfoAside)
                launchInfos.appendChild(launchInfoDiv)


                let dinnerInfos = document.createElement('div')
                let dinnerInfoAside = document.createElement('aside')

                let dinnerBackgroundImage;
                if (dinnerCondition.includes('sun') || dinnerCondition.includes('sunny') || dinnerCondition.includes('Sun') || dinnerCondition.includes('Sunny')) { dinnerBackgroundImage = "sunny"}
                else if (dinnerCondition.includes('rain') || dinnerCondition.includes('rainy') || dinnerCondition.includes('Rain') || dinnerCondition.includes('Rainy')) { dinnerBackgroundImage = "rainy"}
                else { dinnerBackgroundImage = "cloudy"}
                dinnerInfoAside.classList.add(`bg-${dinnerBackgroundImage}`)

                let dinnerTimeTag = document.createElement('h4')
                dinnerTimeTag.innerText = `Dinner`

                dinnerInfoAside.appendChild(dinnerTimeTag)

                let dinnerInfoDiv = document.createElement('div')
                let dinnerTempTag = document.createElement('h5')
                dinnerTempTag.innerText = `${dinnerTemp}°C - ${dinnerCondition}`

                dinnerInfoDiv.appendChild(dinnerTempTag)

                dinnerInfos.appendChild(dinnerInfoAside)
                dinnerInfos.appendChild(dinnerInfoDiv)


                dayCard.appendChild(dayCardHeader)
                dayCard.appendChild(dayInfos)
                dayCard.appendChild(launchInfos)
                dayCard.appendChild(dinnerInfos)

                daysSection.appendChild(dayCard)
            })
        })
}