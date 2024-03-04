import React from 'react';

const WeatherDisplay = ({ weatherData }) => {
  return (
    <div>
      <h2>Current Weather</h2>
      <p>{weatherData.list[0].weather[0].description}</p>
      {/* Display more current weather data as needed */}
      <h2>Forecast for the Next 5 Days</h2>
      {weatherData.list.slice(1, 6).map((item, index) => (
        <div key={index}>
          <p>{item.dt_txt}: {item.weather[0].description}</p>
          {/* Display more forecast data as needed */}
        </div>
      ))}
    </div>
  );
};

export default WeatherDisplay;
