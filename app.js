const search = document.getElementById('search');
const submit = document.getElementById('submit');
const locationLabel = document.getElementById("location");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const icon = document.getElementById("icon");
const errorMessage = document.getElementById("errorMessage");

submit.addEventListener("click", searchWeather);

const apiKey = "63b0402ef77ad3ce7ad91959ddeee17f";

function searchWeather(e) {
    e.preventDefault();
    const location = search.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`

    errorMessage.style.display = "none";
    locationLabel.innerHTML = "";
    temperature.innerHTML = "";
    description.innerHTML = "";
    icon.src = "";

    fetch(url)
    .then((response) => response.json())
    .then((data) => {

        //can only access the response here
        console.log(data)

        if(data.name !==undefined){
        locationLabel.innerHTML = data.name;

        temperature.innerHTML = `${data.main.temp} °C`;

        description.innerHTML = data.weather[0].description;

        icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        } else {
        errorMessage.style.display = "block";
        }

    });
}


