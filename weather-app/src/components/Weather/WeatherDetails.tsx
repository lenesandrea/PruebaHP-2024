import { useState, useEffect } from 'react';
import { getCountryByCode } from '../../services/countryService';

const WeatherDetails: React.FC<{ weather: any }> = ({ weather }) => {
  const [countryDetails, setCountryDetails] = useState<any>(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      const countryCode = weather.sys.country;
      const data = await getCountryByCode(countryCode);
      setCountryDetails(data);
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
          <p>Moneda: {Object.keys(countryDetails.currencies)[0]}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDetails;
