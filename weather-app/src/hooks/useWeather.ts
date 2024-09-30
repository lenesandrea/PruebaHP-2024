import { useState, useEffect } from 'react';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number; 
  };
  sys: {
    country: string;
  };
  weather: {
    description: string;
    icon: string; 
  }[];
  wind: {
    speed: number; 
  };
}

interface CountryData {
  capital: string;
  population: number;
  currencies: { name: string; symbol: string }[];
}

const useWeather = (city: string, apiKey: string) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        const data = await response.json();
        setWeatherData({
          name: data.name,
          main: {
            temp: data.main.temp,
            humidity: data.main.humidity,
            pressure: data.main.pressure, 
          },
          sys: {
            country: data.sys.country,
          },
          weather: [
            {
              description: data.weather[0].description,
              icon: data.weather[0].icon, 
            },
          ],
          wind: {
            speed: data.wind.speed, 
          },
        });
      } catch (err: any) {
        setError(`${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, apiKey]);

  useEffect(() => {
    if (!weatherData?.sys.country) return;

    const fetchCountryData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${weatherData.sys.country}`
        );
        if (!response.ok) {
          throw new Error('Error fetching country data');
        }
        const data = await response.json();
        setCountryData({
          capital: data[0].capital[0],
          population: data[0].population,
          currencies: Object.values(data[0].currencies).map(
            (currency: any) => ({
              name: currency.name,
              symbol: currency.symbol,
            })
          ),
        });
      } catch (err: any) {
        setError(`Country API Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();
  }, [weatherData?.sys.country]);

  return { weatherData, countryData, loading, error };
};

export default useWeather;