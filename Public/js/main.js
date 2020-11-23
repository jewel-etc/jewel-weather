
console.log("Client site js file");


const weatherForm = document.querySelector('form');
const search = document.querySelector('#cityName');
const cityMsg = document.querySelector('#city_name');
const temp = document.querySelector('#temp');
const tempStatus = document.querySelector('#temp_status');
const dataHide = document.querySelector('.middle_layer')


window.onload = (() => {
    // const options = {
    //     enableHighAccuracy: true,
    //     timeout: 10000,
    //     maximumAge: 0
    // };


    function getLocation() {
        if (navigator.geolocation) {
           

                navigator.geolocation.getCurrentPosition(showPosition);          
                cityMsg.textContent = " Current location loading .....";
           
        } else {
            cityMsg.textContent = "Geolocation is not supported by this browser.";
        }
    }
    
    function showPosition(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        


        fetch(`/longLat?longitude=${longitude}&latitude=${latitude}`)

            .then((response) => { displayCurrentWeather(response) })
    }
    getLocation()
})



// CALL WATHER FROM ON EVENT LISTNER

weatherForm.addEventListener('submit', (event) => {

    event.preventDefault();
    const location = search.value
    temp.textContent = " "
    tempStatus.textContent = ""

    cityMsg.textContent = " Loading.....";

    fetch(`/weatherData?address=${location}`)
        .then((response) => { displayCurrentWeather(response) })


})

displayCurrentWeather = ((response) => {

    response.json().then((data) => {
        if (data.error) {
            cityMsg.textContent = data.error;
            dataHide.classList.add('data_hide');

        }
        else {

            dataHide.classList.remove('data_hide');
            if (data.weatherDescription == 'Clear' || data.weatherDescription == 'Sunny') {

                tempStatus.innerHTML = "<i class='fas fa-sun' style='color:yellow;'></i>"
            }

            else if (data.weatherDescription == 'Patchy light drizzle')
                tempStatus.innerHTML = "<i class='fas fa-cloud-rain' style='color:yellow;'></i>"

            else if (data.weatherDescription == 'Rain' ||
                data.weatherDescription == 'Shower in vicinity' ||
                data.weatherDescription == 'Light Rain' ||
                data.weatherDescription == 'Light Rain, Mist') {
                tempStatus.innerHTML = "<i class='fas fa-cloud-showers-heavy' style='color:yellow;'></i>"
            }

            else if (data.weatherDescription == 'Fog' || data.weatherDescription == 'Haze')
                tempStatus.innerHTML = "<i class='fas fa-smog' style='color:yellow;'></i>"

            else if (data.weatherDescription == 'Snow')
                tempStatus.innerHTML = "<i class='fas fa-snoeflake' style='color:yellow;'></i>"

            else if (data.weatherDescription == 'Thunderstrom')
                tempStatus.innerHTML = "<i class='fas fa-poo-strom' style='color:yellow;'></i>"

            else
                tempStatus.innerHTML = "<i class='fas fa-cloud-sun' style='color:yellow;'></i>"

            cityMsg.textContent = data.location;
            temp.innerHTML = ` ${data.temperature}<span><sup>o</sup>C</span>`;

        }
    })





})