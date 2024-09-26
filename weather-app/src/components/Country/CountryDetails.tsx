import React from 'react';

interface CountryDetailsProps {
  name: string;
  capital: string;
  population: number;
  currency: string;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ name, capital, population, currency }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Población: {population}</p>
      <p>Moneda: {currency}</p>
    </div>
  );
};

export default CountryDetails;
