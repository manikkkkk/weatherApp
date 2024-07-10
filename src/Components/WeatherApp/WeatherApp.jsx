import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

const WeatherApp = () => {
    let api_key = "a36b655496b05b07ce372f01e028f068";
    const [Wicon, setWicon] = useState(cloud_icon);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput")[0];
        if (element.value === "") {
            return; // Don't proceed with an empty input
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&appid=${api_key}`;

        try {
            let response = await fetch(url);
            let data = await response.json();
            
            // Use const/let instead of 'var' for consistency
            const humidity = document.getElementsByClassName("humidity-percent")[0];
            const wind = document.getElementsByClassName("WindRate")[0];
            const temperature = document.getElementsByClassName("weather-temp")[0];
            const location = document.getElementsByClassName("weather-location")[0];

            humidity.innerHTML = data.main.humidity + "%";
            wind.innerHTML = data.wind.speed + " km/h";
            // Convert Kelvin to Celsius
            temperature.innerHTML = (data.main.temp - 273.15).toFixed(2) + "°C";
            location.innerHTML = data.name;

            // You can simplify the weather icon logic
            const weatherIcon = data.weather[0].icon;
            switch (weatherIcon) {
                case "01d":
                case "01n":
                    setWicon(clear_icon);
                    break;
                case "02d":
                case "02n":
                    setWicon(cloud_icon);
                    break;
                case "03d":
                case "03n":
                case "04d":
                case "04n":
                    setWicon(drizzle_icon);
                    break;
                case "09d":
                case "09n":
                case "10d":
                case "10n":
                    setWicon(rain_icon);
                    break;
                case "13d":
                case "13n":
                    setWicon(snow_icon);
                    break;
                default:
                    setWicon(clear_icon);
                    break;
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    return (
        <div className='container'>
            <div className='top-bar'>
                <input type="text" className='cityInput' placeholder='Search' />
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={Wicon} alt="" /> {/* Use the Wicon state for the weather icon */}
            </div>
            <div className="weather-temp">25°C</div>
            <div className="weather-location">Lucknow</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="s" />
                    <div className="data"></div>
                    <div className="humidity-percent">60%</div>
                    <div className="text">Humidity</div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="s" />
                    <div className="data"></div>
                    <div className="WindRate">18 km/h</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;
