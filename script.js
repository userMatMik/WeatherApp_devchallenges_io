const openModalBtn = document.querySelector('.open-search-btn');
const searchModal = document.querySelector('.search-modal');
const closeModalBtn = document.querySelector('.close-modal-btn');
const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('.search-btn');
const sidebarOpions = document.querySelector('.sidebar-options');
const weatherContainer = document.querySelector('.todays-weather-container');
const todayHightLights = document.querySelector('.weather-hightlights');

// console.log(weatherContainer);

const searchHistory = [];


const initDate = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
    const d = new Date();

    const dayName = d.toLocaleDateString('en-US', {weekday: 'long'}).slice(0, 3);
    const day = d.getDate();
    const month = months[d.getMonth()];
    // const date = `${dayName}, ${day} ${month}`
    return `${dayName}, ${day} ${month}`
}



//click handler modal
openModalBtn.addEventListener('click', () => {
    // console.log('dziala')
    searchModal.classList.add('active');
})

closeModalBtn.addEventListener('click', () => {
    searchModal.classList.remove('active');
})

//handle search

// const searchedCity = () => {
    searchBtn.addEventListener('click', () => {
        const city = searchInput.value;
        fetchCity(city);
        searchModal.classList.remove('active');
        searchHistory.push(city);
        console.log(searchHistory);

    })
// }

// remove and render highliths

const removeHightlights = () => {
    const highlithsContainer = document.querySelector('.hightlights-container');
    highlithsContainer.remove();
}

const renderHightlights = (weatherData) => {
    removeHightlights();
    const windSpeed = weatherData.wind.speed;
    const windDirection = weatherData.wind.deg;
    const humidity = weatherData.main.humidity;
    const visibility = Math.round(weatherData.visibility * 0.000621371192);
    const airPressure = weatherData.main.pressure;
    const strToInject = `
    <div class="hightlights-container">
    <div class="hightlights-card wind-status">
        <h3 class="hightlight-title">Wind status</h3>
        <span class="hightlight-value">${windSpeed}<span class="hightlight-messure">mph</span></span>
        <span class="hightlight-wind-direction">WSW</span>
    </div>
    <div class="hightlights-card humidity">
        <h3 class="hightlight-title">Humidity</h3>
        <span class="hightlight-value">${humidity}<span class="hightlight-messure">%</span></span>
        <div class="humidity-bar"></div>
    </div>
    <div class="hightlights-card visibility">
        <h3 class="hightlight-title">Visibility</h3>
        <span class="hightlight-value">${visibility}<span class="hightlight-messure">miles</span></span>
    </div>
    <div class="hightlights-card air-pressure">
        <h3 class="hightlight-title">Air Pressure</h3>
        <span class="hightlight-value">${airPressure}<span class="hightlight-messure">mb</span></span>
    </div>
</div>`

    todayHightLights.insertAdjacentHTML('beforeend', strToInject);

}

// render todays weather

const removeTodaysWeather = () => {
    const weatherContainer = document.querySelector('.todays-weather-container');
    weatherContainer.remove();
}


const renderTodaysWeather = (weatherData) => {
    removeTodaysWeather();   
    const temperature = weatherData.main.temp;
    const conditions = weatherData.weather[0].main;
    const cityName = weatherData.name;
    console.log(weatherData);
    const strToInject = `<div class="todays-weather-container">
                            <div class="todays-weather-icon-container">
                                <img src="./assets/images/Shower.png" alt="" class="todays-weather-icon">
                            </div>
                            <p class="todays-weather-temp">${Math.round(temperature)}</p>
                            <span class="todays-weather-conditions">${conditions}</span>
                            <p class="date">Today - ${initDate()}</p>
                            <span class="location">${cityName}</span>
                        </div>`;

    sidebarOpions.insertAdjacentHTML('afterend', strToInject);          
}





const API_KEY = 'f31ea3aad8c079ddc848982f2deba53e';

const url = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}'

const fetchCity = async (searchedCity) => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&limit=5&appid=f31ea3aad8c079ddc848982f2deba53e`)
    const data = await response.json();
    const city = data[0];
    console.log(city)
    fetchTodaysWeather(city);
    
}

const fetchTodaysWeather = async (city) => {
    
    // const city = await fetchCity();
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric`)
    const weatherData = await response.json();
    renderTodaysWeather(weatherData);
    renderHightlights(weatherData);
}




// navigator.geolocation.getCurrentPosition(onSuccess, onError);

// function onSuccess(position) {
//     const {
//         latitude,
//         longitude
//     } = position.coords;

//     message.classList.add('success');
//     message.textContent = `Your location: (${latitude},${longitude})`;
// }

// // handle error case
// function onError() {
//     message.classList.add('error');
//     message.textContent = `Failed to get your location!`;
// }



// fetchCity();
// fetchTodaysWeather();
