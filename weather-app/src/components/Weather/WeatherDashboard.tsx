import React, { useState, useEffect } from 'react';
import WeatherDetails from './WeatherDetails';
import Sidebar from './Sidebar';
import useWeather from '../../hooks/useWeather'; 

const WeatherDashboard: React.FC = () => {
  const [city, setCity] = useState('Madrid'); 
  const apiKey = process.env.API_KEY_OPEN_WEATHER!;
  const { weatherData, loading, error } = useWeather(city, apiKey); 

  return (
    <div className="dashboard">
      <Sidebar />
      {loading && <p>Cargando clima...</p>}
      {error && <p>Error: {error}</p>}
      {weatherData && <WeatherDetails weather={weatherData} />}
    </div>
  );
};

export default WeatherDashboard;
