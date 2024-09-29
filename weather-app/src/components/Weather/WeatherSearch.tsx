// components/Weather/WeatherSearch.tsx
import React, { useState, useEffect } from 'react';
import useWeather from '../../hooks/useWeather'; 
import { useAuth } from '../../context/AuthContext';

const WeatherSearch: React.FC = () => {
  const [city, setCity] = useState('');
  const [history, setHistory] = useState<string[]>([]); // Estado para el historial de búsquedas
  const { user } = useAuth();
  const apiKey = process.env.API_KEY_OPEN_WEATHER!;
  const { weatherData, countryData, loading, error } = useWeather(city, apiKey);

  // Efecto para cargar el historial desde localStorage al inicio
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Manejar la búsqueda de una nueva ciudad
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verifica si la ciudad ya está en el historial
    if (city && !history.includes(city)) {
      const updatedHistory = [...history, city].slice(-5); // Mantiene solo las últimas 5 ciudades
      setHistory(updatedHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory)); // Guardar en localStorage
    }
  };

  // Manejar la búsqueda de una ciudad desde el historial
  const handleHistoryClick = (city: string) => {
    setCity(city); // Establece la ciudad seleccionada
  };

  if (!user) {
    return <div>Por favor, inicia sesión para buscar el clima.</div>;
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Ingrese una ciudad" 
          required 
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}

      {weatherData && (
        <div>
          <h3>{weatherData.name}</h3> {/* Cambiado de cityName a name */}
          <p>Temperatura: {weatherData.main.temp} °C</p> {/* Cambiado de temperature a main.temp */}
          <p>Humedad: {weatherData.main.humidity}%</p> {/* Cambiado de humidity a main.humidity */}
          <p>Descripción: {weatherData.weather[0].description}</p> {/* Cambiado de description a weather[0].description */}
          <p>País: {weatherData.sys.country}</p> {/* Cambiado de countryCode a sys.country */}
        </div>
      )}

      {countryData && (
        <div>
          <h3>Detalles del País</h3>
          <p>Capital: {countryData.capital}</p>
          <p>Población: {countryData.population}</p>
          <p>Moneda: {countryData.currencies.map((currency, index) => (
            <span key={index}>{currency.name} ({currency.symbol})</span>
          ))}</p>
        </div>
      )}

      {/* Mostrar el historial de búsquedas */}
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
    </div>
  );
};

export default WeatherSearch;
