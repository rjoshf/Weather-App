const search = document.getElementById('search');
const submit = document.getElementById('submit');
const locationLabel = document.getElementById('location');
const errorMessage = document.getElementById('errorMessage');
const container = document.getElementById('container');
const dailyTimes = [ 0, 8, 16, 24, 32 ];
submit.addEventListener('click', searchWeather);
dayjs.extend(window.dayjs_plugin_advancedFormat);

const apiKey = '63b0402ef77ad3ce7ad91959ddeee17f';

function searchWeather(e) {
	e.preventDefault();
	const location = search.value;
	const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

	errorMessage.style.display = 'none';
	const weatherBlock = document.getElementsByClassName('weatherBlock');
	const weatherArray = [ ...weatherBlock ];

	if (weatherArray.length > 0) {
		weatherArray.map((element) => {
			element.remove();
		});
	}

	fetch(url).then((response) => response.json()).then((data) => {
		console.log(data);

		if (data.message !== 'city not found') {
			locationLabel.innerHTML = data.city.name;

			data.list.map((el, index) => {
				if (dailyTimes.includes(index)) {
					const temperatureRounded = Math.round(el.main.temp);
					const dailyTemperatures = document.createTextNode(temperatureRounded + '°C');
					const temperatureDiv = document.createElement('div');
					temperatureDiv.appendChild(dailyTemperatures);
					temperatureDiv.classList.add('temperature');

					const dates = dayjs(el.dt_txt).format('dddd, MMM Do');
					const dailyDates = document.createTextNode(dates);
					const dateDiv = document.createElement('div');
					dateDiv.appendChild(dailyDates);
					dateDiv.classList.add('date');

					const time = dayjs(el.dt_txt).format('h:mm a');
					const dailyTimes = document.createTextNode(time);
					const timeDiv = document.createElement('div');
					timeDiv.appendChild(dailyTimes);
					timeDiv.classList.add('time');

					const weatherDescription = document.createTextNode(
						`${el.weather[0].description}`[0].toUpperCase() + `${el.weather[0].description}`.slice(1)
					);
					const weatherIcon = document.createElement('img');
					weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${el.weather[0].icon}.png`);
					weatherIcon.setAttribute('height', '50px');
					weatherIcon.setAttribute('width', '50px');
					const descriptionDiv = document.createElement('div');
					descriptionDiv.classList.add('description');
					descriptionDiv.appendChild(weatherDescription);
					descriptionDiv.appendChild(weatherIcon);

					const weatherDiv = document.createElement('div');
					weatherDiv.classList.add('weatherBlock');
					weatherDiv.appendChild(dateDiv);
					weatherDiv.appendChild(timeDiv);
					weatherDiv.appendChild(temperatureDiv);
					weatherDiv.appendChild(descriptionDiv);
					container.appendChild(weatherDiv);
				}
			});
		} else {
			locationLabel.innerHTML = '';
			errorMessage.style.display = 'block';
		}
	});
}
