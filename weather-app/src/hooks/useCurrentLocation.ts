import { useState, useEffect } from 'react';

// Custom hook to fetch the current location (city) based on the user's geolocation
const useCurrentLocation = (apiKey: string) => {
  const [city, setCity] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Function to fetch city from coordinates
    const fetchCityFromCoordinates = async (latitude: number, longitude: number) => {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=5a4b9e0a6e8cb9871258b1490fe8d354`
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

    // Function to get the current geolocation
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

    // Start fetching the location
    getLocation();
  }, [apiKey]);

  return { city, loading, error };
};

export default useCurrentLocation;
