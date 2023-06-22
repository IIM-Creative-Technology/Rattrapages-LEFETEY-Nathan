// Définition des constantes
const API_URL = "https://api.weatherapi.com/v1/";
const API_KEY = "ec12d30916fe42d596d194859231906";
const API_CITY = "Paris";
const DAYS_RANGE = 14;

// Variables pour stocker les éléments HTML
let daysList = [];
let buttonsList = [];
const welcomeText = document.getElementById('welcome-text');
const daysSection = document.getElementById('days-data-section');
const asideButtons = document.getElementById('aside-display-buttons');

// Appel de la fonction principale au chargement de la page
window.onload = getWeatherData;

// Fonction pour récupérer les données météorologiques
async function getWeatherData() {
    try {
        // Appel à l'API pour récupérer les données météorologiques
        const response = await fetch(`${API_URL}forecast.json?key=${API_KEY}&q=${API_CITY}&days=${DAYS_RANGE}&aqi=no&alerts=no`);
        const data = await response.json();
        const days = data.forecast.forecastday;

        // Parcours des jours et création des cartes correspondantes
        days.forEach((day) => {
            const { date, day: dayData } = day;
            const { mintemp_c: minTemp, maxtemp_c: maxTemp, condition: { text: dayCondition } } = dayData;
            const { condition: { text: launchCondition }, temp_c: launchTemp } = day.hour[12];
            const { condition: { text: dinnerCondition }, temp_c: dinnerTemp } = day.hour[20];

            // Création de la carte pour le jour en cours
            const dayCard = createDayCard(date, dayCondition, minTemp, maxTemp, launchCondition, launchTemp, dinnerCondition, dinnerTemp);
            daysSection.appendChild(dayCard);

            // Création du bouton pour afficher les informations du jour correspondant
            const dayButton = createDayDisplayButton(date);
            asideButtons.appendChild(dayButton);
        });
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Fonction pour créer un bouton d'affichage des informations d'un jour
function createDayDisplayButton(date) {
    const buttonId = `button-day-${date}`;
    buttonsList.push(buttonId);
    let i = buttonsList.length;
    const displayButton = document.createElement('button');
    displayButton.id = `${buttonId}`;
    displayButton.innerText = `See Weather of ${date}`;
    displayButton.classList.add('text-mongoo', 'font-bold', 'border-2', 'border-white', 'hover:border-mongoo', 'p-4');

    // Ajout de classes spécifiques pour le premier et le dernier bouton
    if (i === 1) {
        displayButton.classList.add('rounded-first-btn');
    } else if (i === 14) {
        displayButton.classList.add('rounded-last-btn');
    }

    // Ajout d'un gestionnaire d'événement pour afficher les informations du jour correspondant
    displayButton.addEventListener('click', () => {
        welcomeText.classList.remove('flex');
        welcomeText.classList.add('hidden');

        // Masquage des autres cartes
        daysList.forEach(id => {
            let day = document.getElementById(id);
            day.classList.remove('flex');
            day.classList.add('hidden');
        });

        // Réinitialisation de l'apparence des autres boutons
        buttonsList.forEach(id => {
            let button = document.getElementById(id);
            button.classList.remove('bg-mongoo', 'text-white', 'border-mongoo');
        });

        // Mise en surbrillance du bouton actif
        displayButton.classList.add('bg-mongoo', 'text-white', 'border-mongoo');

        // Affichage des informations du jour correspondant
        const day = document.getElementById(`day-${date}`);
        day.classList.remove('hidden');
        day.classList.add('flex');
    });

    return displayButton;
}

// Fonction pour créer une carte pour un jour donné
function createDayCard(date, dayCondition, minTemp, maxTemp, launchCondition, launchTemp, dinnerCondition, dinnerTemp) {
    const divId = `day-${date}`;
    daysList.push(divId);
    const dayCard = document.createElement('div');
    dayCard.id = divId;
    dayCard.classList.add('w-full', 'hidden', 'flex-col', 'rounded-2xl', 'shadow-card', 'pb-4');

    // Création de l'en-tête de la carte
    const dayCardHeader = createDayCardHeader(dayCondition);
    // Création des informations principales du jour (date, températures)
    const dayInfos = createDayInfos(date, minTemp, maxTemp);
    // Création des informations sur la fréquentation (déjeuner, dîner)
    const crowdInfo = createCrowdInfo(launchCondition, launchTemp, dinnerCondition, dinnerTemp);

    // Ajout des éléments à la carte du jour
    dayCard.appendChild(dayCardHeader);
    dayCard.appendChild(dayInfos);
    dayCard.appendChild(crowdInfo);

    return dayCard;
}

// Fonction pour créer l'en-tête de la carte d'un jour
function createDayCardHeader(condition) {
    const headerBackgroundImage = getHeaderBackgroundImage(condition);
    const dayCardHeader = document.createElement('header');
    dayCardHeader.classList.add(`bg-${headerBackgroundImage}`, 'bg-cover', 'bg-no-repeat', 'bg-center', 'rounded-banner', 'h-40', 'flex', 'items-end', 'p-4');

    const cardConditionTag = document.createElement('span');
    cardConditionTag.innerText = condition;
    cardConditionTag.classList.add('text-white', 'text-base', 'uppercase', 'font-bold');

    dayCardHeader.appendChild(cardConditionTag);
    return dayCardHeader;
}

// Fonction pour déterminer l'image d'arrière-plan de l'en-tête de la carte en fonction des conditions météorologiques
function getHeaderBackgroundImage(condition) {
    if (typeof condition === 'string' && (condition.includes('sun') || condition.includes('sunny') || condition.includes('Sun') || condition.includes('Sunny'))) {
        return 'sunny';
    }
    if (typeof condition === 'string' && (condition.includes('rain') || condition.includes('rainy') || condition.includes('Rain') || condition.includes('Rainy'))) {
        return 'rainy';
    }
    return 'cloudy';
}

// Fonction pour créer les informations principales d'un jour (date, températures)
function createDayInfos(date, minTemp, maxTemp) {
    const dayInfos = document.createElement('div');
    dayInfos.classList.add('flex', 'flex-col', 'md:flex-row', 'md:items-center', 'justify-between', 'px-4', 'py-10');

    const cardTitle = document.createElement('h3');
    cardTitle.innerText = date;
    cardTitle.classList.add('font-bold', 'font-[28px]');

    const cardTempTag = document.createElement('p');
    cardTempTag.innerText = `${minTemp}°C - ${maxTemp}°C`;
    cardTempTag.classList.add('font-bold', 'font-[28px]');

    dayInfos.appendChild(cardTitle);
    dayInfos.appendChild(cardTempTag);

    return dayInfos;
}

// Fonction pour créer les informations sur la fréquentation d'un jour (déjeuner, dîner)
function createCrowdInfo(launchCondition, launchTemp, dinnerCondition, dinnerTemp) {
    const launchInfos = createCrowdInfoSection(launchCondition, launchTemp, 'launch');
    const dinnerInfos = createCrowdInfoSection(dinnerCondition, dinnerTemp, 'dinner');

    const crowdInfo = document.createElement('div');
    crowdInfo.classList.add('flex', 'flex-col', 'lg:flex-row', 'justify-between', 'items-center', 'gap-10', 'px-4');
    crowdInfo.appendChild(launchInfos);
    crowdInfo.appendChild(dinnerInfos);

    return crowdInfo;
}

// Fonction pour créer une section d'informations sur la fréquentation (déjeuner, dîner)
function createCrowdInfoSection(condition, temperature, time) {
    const backgroundImage = getCrowdInfoBackgroundImage(condition);
    const crowds = getCrowdInfoText(condition);
    const color = getCrowdInfoTextColor(condition);

    const infoAside = document.createElement('aside');
    infoAside.classList.add(`bg-${backgroundImage}`, 'w-full', 'h-32', 'flex', 'items-end', 'p-4', 'bg-cover', 'bg-no-repeat', 'bg-center', 'rounded-banner');

    const timeTag = document.createElement('h4');
    timeTag.innerText = time;
    timeTag.classList.add('text-white', 'text-base', 'uppercase', 'font-bold');

    infoAside.appendChild(timeTag);

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('w-full', 'h-32', 'px-4', 'py-8', 'flex', 'flex-col', 'justify-center', 'gap-4');

    const tempTag = document.createElement('h5');
    tempTag.classList.add('font-bold');
    tempTag.innerText = `${condition} - ${temperature}°C`;

    const crowdsTag = document.createElement('p');
    crowdsTag.innerHTML = `<span class="text-[28px]">•</span> ${crowds}`;
    crowdsTag.classList.add(`${color}`, 'flex', 'items-center');

    infoDiv.appendChild(tempTag);
    infoDiv.appendChild(crowdsTag);

    const infoSection = document.createElement('div');
    infoSection.classList.add('flex', 'flex-col', 'items-end', 'w-full', 'lg:w-3/6', 'rounded-2xl', 'shadow-card');
    infoSection.appendChild(infoAside);
    infoSection.appendChild(infoDiv);

    return infoSection;
}

// Fonction pour déterminer l'image d'arrière-plan de la section d'informations sur la fréquentation en fonction des conditions météorologiques
function getCrowdInfoBackgroundImage(condition) {
    if (typeof condition === 'string' && (condition.includes('sun') || condition.includes('sunny') || condition.includes('Sun') || condition.includes('Sunny'))) {
        return 'sunny';
    }
    if (typeof condition === 'string' && (condition.includes('rain') || condition.includes('rainy') || condition.includes('Rain') || condition.includes('Rainy'))) {
        return 'rainy';
    }
    return 'cloudy';
}

// Fonction pour obtenir le texte d'informations sur la fréquentation en fonction des conditions météorologiques
function getCrowdInfoText(condition) {
    if (typeof condition === 'string' && (condition.includes('sun') || condition.includes('sunny') || condition.includes('Sun') || condition.includes('Sunny'))) {
        return 'Expect a high number of visitors';
    }
    if (typeof condition === 'string' && (condition.includes('rain') || condition.includes('rainy') || condition.includes('Rain') || condition.includes('Rainy'))) {
        return 'Expect a low number of visitors';
    }
    return 'Expect an average number of visitors';
}

// Fonction pour obtenir la couleur du texte d'informations sur la fréquentation en fonction des conditions météorologiques
function getCrowdInfoTextColor(condition) {
    if (typeof condition === 'string' && (condition.includes('sun') || condition.includes('sunny') || condition.includes('Sun') || condition.includes('Sunny'))) {
        return 'text-red-500';
    }
    if (typeof condition === 'string' && (condition.includes('rain') || condition.includes('rainy') || condition.includes('Rain') || condition.includes('Rainy'))) {
        return 'text-green-500';
    }
    return 'text-yellow-500';
}
