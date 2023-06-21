const API_URL = "https://api.weatherapi.com/v1/"
const API_KEY = "ec12d30916fe42d596d194859231906"
let API_CITY = "Paris"
let DAYS_RANGE = 14

const daysSection = document.getElementById('days-data-section')
const showFirst = document.getElementById('show-first')
showFirst.addEventListener('click', () => {
    document.getElementById('day-2023-06-21').classList.remove('hidden')
    document.getElementById('day-2023-06-21').classList.add('flex')
})

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
                dayCard.classList.add('w-full', 'hidden', 'flex-col', 'rounded-2xl', 'shadow-card', 'pb-4')

                let dayCardHeader = document.createElement('header')

                let headerBackgroundImage;
                if (condition.includes('sun') || condition.includes('sunny') || condition.includes('Sun') || condition.includes('Sunny')) { headerBackgroundImage = "sunny"}
                else if (condition.includes('rain') || condition.includes('rainy') || condition.includes('Rain') || condition.includes('Rainy')) { headerBackgroundImage = "rainy"}
                else { headerBackgroundImage = "cloudy"}
                dayCardHeader.classList.add(`bg-${headerBackgroundImage}`, 'bg-cover', 'bg-no-repeat', 'bg-center', 'rounded-banner', 'h-40', 'flex', 'items-end', 'p-4')

                let cardConditionTag = document.createElement('span')
                cardConditionTag.innerText = `${condition}`
                cardConditionTag.classList.add('text-white', 'text-base', 'capitalize', 'font-bold')

                dayCardHeader.appendChild(cardConditionTag)


                let dayInfos = document.createElement('div')
                dayInfos.classList.add('flex', 'items-center', 'justify-between', 'px-4', 'py-10')

                let cardTitle = document.createElement('h3')
                cardTitle.innerText = `${date}`
                cardTitle.classList.add('font-bold', 'font-[28px]')

                let cardTempTag = document.createElement('p')
                cardTempTag.innerText = `${minTemp}°C - ${maxTemp}°C`
                cardTempTag.classList.add('font-bold', 'font-[28px]')

                dayInfos.appendChild(cardTitle)
                dayInfos.appendChild(cardTempTag)


                let launchInfos = document.createElement('div')
                launchInfos.classList.add('flex', 'flex-col', 'items-end', 'w-3/6', 'rounded-2xl', 'shadow-card')
                let launchInfoAside = document.createElement('aside')

                let launchBackgroundImage;
                let launchCrowds;
                let launchCrowdsColor;
                if (launchCondition.includes('sun') || launchCondition.includes('sunny') || launchCondition.includes('Sun') || launchCondition.includes('Sunny')) { launchBackgroundImage = "sunny"; launchCrowds = "Large crowds expected"; launchCrowdsColor = "#b50000"}
                else if (launchCondition.includes('rain') || launchCondition.includes('rainy') || launchCondition.includes('Rain') || launchCondition.includes('Rainy')) { launchBackgroundImage = "rainy"; launchCrowds = "Average attendance to be expected"; launchCrowdsColor = "#d49400"}
                else { launchBackgroundImage = "cloudy"; launchCrowds = "Low attendance expected"; launchCrowdsColor = "#05a100"}
                launchInfoAside.classList.add(`bg-${launchBackgroundImage}`, 'w-full', 'h-32', 'flex', 'items-end', 'p-4', 'bg-cover', 'bg-no-repeat', 'bg-center', 'rounded-banner')

                let launchTimeTag = document.createElement('h4')
                launchTimeTag.innerText = `Launch`
                launchTimeTag.classList.add('text-white', 'text-base', 'capitalize', 'font-medium')

                launchInfoAside.appendChild(launchTimeTag)

                let launchInfoDiv = document.createElement('div')
                launchInfoDiv.id ='clip-path-div'
                launchInfoDiv.classList.add('w-full', 'h-32', 'px-4', 'py-8', 'flex', 'flex-col', 'justify-center', 'gap-4')

                let launchTempTag = document.createElement('h5')
                launchTempTag.classList.add('font-bold')
                launchTempTag.innerText = `${launchTemp}°C - ${launchCondition}`
                let launchCrowdsTag = document.createElement('p')
                launchCrowdsTag.innerHTML = `<span class="text-[28px]">•</span> ${launchCrowds}`
                launchCrowdsTag.classList.add(`text-[${launchCrowdsColor}]`, 'flex', 'items-center')

                launchInfoDiv.appendChild(launchTempTag)
                launchInfoDiv.appendChild(launchCrowdsTag)

                launchInfos.appendChild(launchInfoAside)
                launchInfos.appendChild(launchInfoDiv)


                let dinnerInfos = document.createElement('div')
                dinnerInfos.classList.add('flex', 'flex-col', 'items-end', 'w-3/6', 'rounded-2xl', 'shadow-card')
                let dinnerInfoAside = document.createElement('aside')

                let dinnerBackgroundImage;
                let dinnerCrowds;
                let dinnerCrowdsColor;
                if (dinnerCondition.includes('sun') || dinnerCondition.includes('sunny') || dinnerCondition.includes('Sun') || dinnerCondition.includes('Sunny')) { dinnerBackgroundImage = "sunny"; dinnerCrowds = "Large crowds expected"; dinnerCrowdsColor = "#b50000"}
                else if (dinnerCondition.includes('rain') || dinnerCondition.includes('rainy') || dinnerCondition.includes('Rain') || dinnerCondition.includes('Rainy')) { dinnerBackgroundImage = "rainy"; dinnerCrowds = "Average attendance to be expected"; dinnerCrowdsColor = "#d49400"}
                else { dinnerBackgroundImage = "cloudy"; dinnerCrowds = "Low attendance expected"; dinnerCrowdsColor = "#05a100"}
                dinnerInfoAside.classList.add(`bg-${dinnerBackgroundImage}`, 'w-full', 'h-32', 'flex', 'items-end', 'p-4', 'bg-cover', 'bg-no-repeat', 'bg-center', 'rounded-banner')

                let dinnerTimeTag = document.createElement('h4')
                dinnerTimeTag.innerText = `Dinner`
                dinnerTimeTag.classList.add('text-white', 'text-base', 'capitalize', 'font-medium')

                dinnerInfoAside.appendChild(dinnerTimeTag)

                let dinnerInfoDiv = document.createElement('div')
                dinnerInfoDiv.id ='clip-path-div'
                dinnerInfoDiv.classList.add('w-full', 'h-32', 'px-4', 'py-8', 'flex', 'flex-col', 'justify-center', 'gap-4')
                let dinnerTempTag = document.createElement('h5')
                dinnerTempTag.classList.add('font-bold')
                dinnerTempTag.innerText = `${dinnerCondition} - ${dinnerTemp}°C`
                let dinnerCrowdsTag = document.createElement('p')
                dinnerCrowdsTag.innerHTML = `<span class="text-[28px]">•</span> ${dinnerCrowds}`
                dinnerCrowdsTag.classList.add(`text-[${dinnerCrowdsColor}]`, 'flex', 'items-center')

                dinnerInfoDiv.appendChild(dinnerTempTag)
                dinnerInfoDiv.appendChild(dinnerCrowdsTag)

                dinnerInfos.appendChild(dinnerInfoAside)
                dinnerInfos.appendChild(dinnerInfoDiv)

                let crowdInfo = document.createElement('div')
                crowdInfo.classList.add('flex', 'justify-between', 'items-center', 'gap-10', 'px-4')
                crowdInfo.appendChild(launchInfos)
                crowdInfo.appendChild(dinnerInfos)


                dayCard.appendChild(dayCardHeader)
                dayCard.appendChild(dayInfos)
                dayCard.appendChild(crowdInfo)

                daysSection.appendChild(dayCard)
            })
        })
}