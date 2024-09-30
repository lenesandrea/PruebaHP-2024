import { CountryDetailsI } from '../../components/Weather/WeatherDetails';
import { CountryDetailsContainer } from 'assets/styles/WeatherStyle';
import React from 'react';

interface CountryDetailsProps {
  country: CountryDetailsI;
}


const CountryDetails: React.FC<CountryDetailsProps> = ({ country }) => {
  return (
    <CountryDetailsContainer>
      <h4>Información del País:</h4>
      <p>
        <strong>Capital:</strong> {country.capital[0]}
      </p>
      <p>
        <strong>Población:</strong> {country.population}
      </p>
      {country.currencies &&
        Object.keys(country.currencies).length > 0 && (
          <p>
            <strong>Moneda:</strong>
            {Object.values(country.currencies)[0]?.name} (
            {Object.values(country.currencies)[0]?.symbol})
          </p>
        )}
      <p>
        <strong>Región:</strong> {country.region}
    </p>
  </CountryDetailsContainer>
  );
};

export default CountryDetails;
