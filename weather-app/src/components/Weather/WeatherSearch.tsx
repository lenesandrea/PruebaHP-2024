import React, { useState, useEffect } from 'react';
import useWeather from '../../hooks/useWeather';
import { useAuth } from '../../context/AuthContext';
import {
  WeatherContainer,
  CurrentWeather,
  Temperature,
  WeatherIcon,
  WeatherInfo,
  WeatherDescription,
  SearchForm,
  DashboardContainer,
} from '../../assets/styles/WeatherStyle';

const WeatherSearch: React.FC = () => {
  const [city, setCity] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const { user } = useAuth();
  const apiKey = '5a4b9e0a6e8cb9871258b1490fe8d354';
  const { weatherData, loading, error } = useWeather(city, apiKey);
  const [isDarkMode, setIsDarkMode] = useState(false); 

  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city && !history.includes(city)) {
      const updatedHistory = [...history, city].slice(-5);
      setHistory(updatedHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    }
  };

  const handleHistoryClick = (city: string) => {
    setCity(city);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  if (!user) {
    return <div>Por favor, inicia sesión para buscar el clima.</div>;
  }

  return (
    <DashboardContainer isDarkMode={isDarkMode}>
      <h2>React Weather</h2>
      <button onClick={toggleDarkMode}>
        Cambiar a {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
      </button>

      <SearchForm onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Ingrese una ciudad"
          required
        />
        <button type="submit">Buscar</button>
      </SearchForm>

      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}

      {weatherData && (
        <WeatherContainer isDarkMode={isDarkMode}>
          <CurrentWeather isDarkMode={isDarkMode}>
            <WeatherInfo>
              <h3>{weatherData.name}</h3>
              <WeatherDescription>{weatherData.weather[0]?.description}</WeatherDescription>
              <p>Humedad: {weatherData.main.humidity}%</p>
              <p>Viento: {weatherData.wind.speed} kph</p>
              <p>Presión: {weatherData.main.pressure} hPa</p>
            </WeatherInfo>
            <div>
              <Temperature>{Math.round(weatherData.main.temp)}°C</Temperature>
              <WeatherIcon
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@2x.png`}
                alt="weather icon"
              />
            </div>
          </CurrentWeather>

        </WeatherContainer>
      )}

      <div>
        <h4>Historial de Búsquedas</h4>
        <ul>
          {history.map((city, index) => (
            <li key={index}>
              <button onClick={() => handleHistoryClick(city)}>{city}</button>
            </li>
          ))}
        </ul>
      </div>
    </DashboardContainer>
  );
};

export default WeatherSearch;
