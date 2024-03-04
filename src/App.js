import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(latitude, longitude);
      }, (error) => {
        setError(error.message);
      });
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  const fetchWeatherData = async (latitude, longitude) => {
    setLoading(true);
    try {
      const apiKey = '44fd70d7ee00e0b91a525e7c33790683';
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data.');
      }
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location.trim()) return;
    setLoading(true);
    try {
      const apiKey = '44fd70d7ee00e0b91a525e7c33790683';
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`);
      if (!response.ok) {
        throw new Error('Location not found.');
      }
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
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
      )}
    </div>
  );
}

export default App;
