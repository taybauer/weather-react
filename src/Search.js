import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState(false);
  const [weather, setWeather] = useState({});

  function showResponse(response) {
    setSearch(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "3ed235ed9a16f901f3484e3e2f26d72f";
    let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiLink).then(showResponse);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Enter a city..."
        onChange={updateCity}
      />
      <input type="submit" value="Search" />
    </form>
  );

  let list = (
    <ul>
      <li>Temperature: {Math.round(weather.temperature)}°C</li>
      <li>Description: {weather.description}</li>
      <li>Humidity: {weather.humidity}%</li>
      <li>Wind: {weather.wind}m/h</li>
      <li>
        <img src={weather.icon} alt={weather.description} />
      </li>
    </ul>
  );

  if (search) {
    return (
      <div>
        {form}
        {list}
      </div>
    );
  } else {
    return form;
  }
}
