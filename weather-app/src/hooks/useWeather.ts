import { useState } from 'react';
import { getWeatherByCity } from '../services/weatherService';

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError('');
    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      setError('Ciudad no encontrada o error en la API');
    } finally {
      setLoading(false);
    }
  };

  return { weather, fetchWeather, loading, error };
};
