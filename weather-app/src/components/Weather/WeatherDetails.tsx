import React, { useState, useEffect } from 'react';
import { getCountryByCode } from '../../services/countryService';

interface Weather {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  weather: {
    description: string;
  }[];
}

interface CountryDetails {
  name: {
    common: string;
  };
  capital: string[];
  population: number;
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
}

const WeatherDetails: React.FC<{ weather: Weather }> = ({ weather }) => {
  const [countryDetails, setCountryDetails] = useState<CountryDetails | null>(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      if (weather && weather.sys.country) {
        const countryCode = weather.sys.country;
        const data = await getCountryByCode(countryCode);
        setCountryDetails(data);
      }
    };

    fetchCountryDetails();
  }, [weather]);

  return (
    <div>
      <h2>{weather.name}, {weather.sys.country}</h2>
      <p>Temperatura: {weather.main.temp}°C</p>
      <p>Humedad: {weather.main.humidity}%</p>
      <p>Descripción: {weather.weather[0].description}</p>
      {countryDetails && (
        <div>
          <h3>{countryDetails.name.common}</h3>
          <p>Capital: {countryDetails.capital[0]}</p>
          <p>Población: {countryDetails.population}</p>
          <p>Moneda: {Object.values(countryDetails.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDetails;
