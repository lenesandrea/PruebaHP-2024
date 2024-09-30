import React, { useState, useEffect, memo } from 'react';
import { getCountryByCode } from '../../services/countryService';
import {
  CurrentWeather,
  Temperature,
  WeatherContainer,
  WeatherDescription,
  WeatherIcon,
  WeatherInfo,
  WeatherInfoTemp,
} from 'assets/styles/WeatherStyle';
import { WeatherData } from '../../hooks/useWeather';
import { useSearchHistory } from '../../hooks/useSearchHistory';
import CountryDetails from '../../components/Country/CountryDetails';

export interface CountryDetailsI {
  capital: string[];
  population: number;
  currencies: { [key: string]: { name: string; symbol: string } };
  region: string;
}

interface WeatherDetailsProps {
  weather: WeatherData | null;
}

const areEqual = (prevProps: WeatherDetailsProps, nextProps: WeatherDetailsProps) => {
  if (prevProps.weather === null && nextProps.weather === null) return true;
  if (prevProps.weather === null || nextProps.weather === null) return false;

  return (
    prevProps.weather.name === nextProps.weather.name &&
    prevProps.weather.main.temp === nextProps.weather.main.temp &&
    prevProps.weather.main.humidity === nextProps.weather.main.humidity &&
    prevProps.weather.wind.speed === nextProps.weather.wind.speed &&
    prevProps.weather.sys.country === nextProps.weather.sys.country &&
    prevProps.weather.weather[0].description === nextProps.weather.weather[0].description &&
    prevProps.weather.weather[0].icon === nextProps.weather.weather[0].icon
  );
};

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weather }) => {
  const { history, addCityToHistory } = useSearchHistory();
  const [countryDetails, setCountryDetails] = useState<CountryDetailsI | null>(
    null
  );
  const [showCountryInfo, setShowCountryInfo] = useState(false);

  useEffect(() => {
    if (weather) {
      const { name: cityName } = weather;
      if (cityName && !history.includes(cityName)) {
        addCityToHistory(cityName);
      }
      fetch(`https://restcountries.com/v3.1/name/${weather.sys.country}`)
        .then((response) => response.json())
        .then((data) => setCountryDetails(data[0]));
    }
  }, [weather, history, addCityToHistory]);

  const toggleCountryInfo = () => {
    setShowCountryInfo(!showCountryInfo);
  };

  if (!weather) return (<></>);

  return (
    <WeatherContainer>
      <CurrentWeather>
        <WeatherInfo>
          <h3>
            {weather!.name},
            <span
              onClick={toggleCountryInfo}
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              {weather!.sys.country}
            </span>
          </h3>
          <WeatherDescription>
            {weather!.weather[0].description}
          </WeatherDescription>
          <p>Humedad: {weather!.main.humidity}%</p>
          <p>Viento: {weather!.wind.speed} kph</p>
          <p>Presión: {weather!.main.pressure} hPa</p>
        </WeatherInfo>
        <WeatherInfoTemp>
          <Temperature>{Math.round(weather!.main.temp)}°C</Temperature>
          <WeatherIcon
            src={`http://openweathermap.org/img/wn/${weather!.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </WeatherInfoTemp>
      </CurrentWeather>

      {showCountryInfo && countryDetails && (
        <CountryDetails country={countryDetails}/>
      )}
    </WeatherContainer>
  );
};

export default React.memo(WeatherDetails, areEqual);
