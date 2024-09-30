import { useState, useEffect } from 'react';

const apiKey = process.env.REACT_APP_API_KEY_OPEN_WEATHER!;

const useCurrentLocation = () => {
  const [city, setCity] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCityFromCoordinates = async (latitude: number, longitude: number) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          setCity(data[0].name);
        } else {
          setError('City not found');
        }
      } catch (err) {
        setError('Failed to fetch city');
      } finally {
        setLoading(false);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchCityFromCoordinates(latitude, longitude);
          },
          (err) => {
            setError('Geolocation permission denied');
            setLoading(false);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser');
        setLoading(false);
      }
    };

    getLocation();
  }, [apiKey]);

  return { city, loading, error };
};

export default useCurrentLocation;
