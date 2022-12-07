const search = document.getElementById('search');
const submit = document.getElementById('submit');
const locationLabel = document.getElementById('location');
const errorMessage = document.getElementById('errorMessage');
const container = document.getElementById('container');
submit.addEventListener('click', searchWeather);
dayjs.extend(window.dayjs_plugin_advancedFormat);

const apiKey = 'cbf8cc06629b49f2b417e3f5d1749973';

function searchWeather(e) {
	e.preventDefault();
	const location = search.value;
	const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${location}&days=5&key=${apiKey}`;

	errorMessage.style.display = 'none';
	const weatherBlock = document.getElementsByClassName('weatherBlock');
	const weatherArray = [ ...weatherBlock ];

	if (weatherArray.length > 0) {
		weatherArray.map((element) => {
			element.remove();
		});
	}

	fetch(url)
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			throw new Error('Something went wrong');
		})
		.then((data) => {
			if (data) {
				locationLabel.innerHTML = data.city_name;

				data.data.map((el) => {
					const temperatureRounded = Math.round(el.temp);
					const dailyTemperatures = document.createTextNode(temperatureRounded + '°C');
					const temperatureDiv = document.createElement('div');
					temperatureDiv.appendChild(dailyTemperatures);
					temperatureDiv.classList.add('temperature');

					const dates = dayjs(el.datetime).format('dddd, MMM Do');
					const dailyDates = document.createTextNode(dates);
					const dateDiv = document.createElement('div');
					dateDiv.appendChild(dailyDates);
					dateDiv.classList.add('date');

					const weatherDescription = document.createTextNode(`${el.weather.description}`);
					const weatherIcon = document.createElement('img');
					weatherIcon.setAttribute(
						'src',
						`https://www.weatherbit.io/static/img/icons/${el.weather.icon}.png`
					);
					weatherIcon.setAttribute('height', '50px');
					weatherIcon.setAttribute('width', '50px');
					const descriptionDiv = document.createElement('div');
					descriptionDiv.classList.add('description');
					descriptionDiv.appendChild(weatherDescription);
					descriptionDiv.appendChild(weatherIcon);

					const weatherDiv = document.createElement('div');
					weatherDiv.classList.add('weatherBlock');
					weatherDiv.appendChild(dateDiv);
					weatherDiv.appendChild(temperatureDiv);
					weatherDiv.appendChild(descriptionDiv);
					container.appendChild(weatherDiv);
				});
			} else {
				locationLabel.innerHTML = '';
				errorMessage.style.display = 'block';
				console.log('test');
			}
		})
		.catch(() => {
			locationLabel.innerHTML = '';
			errorMessage.style.display = 'block';
		});

	// fetch(url).then((response) => response.json()).then((data) => {
	// 	console.log(data);
	// 	if (data) {
	// 		locationLabel.innerHTML = data.city_name;

	// 		data.data.map((el) => {
	// 			const temperatureRounded = Math.round(el.temp);
	// 			const dailyTemperatures = document.createTextNode(temperatureRounded + '°C');
	// 			const temperatureDiv = document.createElement('div');
	// 			temperatureDiv.appendChild(dailyTemperatures);
	// 			temperatureDiv.classList.add('temperature');

	// 			const dates = dayjs(el.datetime).format('dddd, MMM Do');
	// 			const dailyDates = document.createTextNode(dates);
	// 			const dateDiv = document.createElement('div');
	// 			dateDiv.appendChild(dailyDates);
	// 			dateDiv.classList.add('date');

	// 			const weatherDescription = document.createTextNode(`${el.weather.description}`);
	// 			const weatherIcon = document.createElement('img');
	// 			weatherIcon.setAttribute('src', `https://www.weatherbit.io/static/img/icons/${el.weather.icon}.png`);
	// 			weatherIcon.setAttribute('height', '50px');
	// 			weatherIcon.setAttribute('width', '50px');
	// 			const descriptionDiv = document.createElement('div');
	// 			descriptionDiv.classList.add('description');
	// 			descriptionDiv.appendChild(weatherDescription);
	// 			descriptionDiv.appendChild(weatherIcon);

	// 			const weatherDiv = document.createElement('div');
	// 			weatherDiv.classList.add('weatherBlock');
	// 			weatherDiv.appendChild(dateDiv);
	// 			weatherDiv.appendChild(temperatureDiv);
	// 			weatherDiv.appendChild(descriptionDiv);
	// 			container.appendChild(weatherDiv);
	// 		});
	// 	} else {
	// 	}
	// });
}
