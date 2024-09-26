import { useState } from 'react';
import { useWeather } from '../../hooks/useWeather';
import { useSearchHistory } from '../../hooks/useSearchHistory';
import WeatherDetails from './WeatherDetails';

const WeatherSearch: React.FC = () => {
  const [city, setCity] = useState('');
  const { weather, fetchWeather, loading, error } = useWeather();
  const { addCityToHistory } = useSearchHistory();

  const handleSearch = async () => {
    await fetchWeather(city);
    addCityToHistory(city);
  };

  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Ingresa una ciudad"
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
      {error && <p>{error}</p>}
      {weather && <WeatherDetails weather={weather} />}
    </div>
  );
};

export default WeatherSearch;
