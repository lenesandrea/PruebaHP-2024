import React from 'react';

interface Country {
  name: string;
  code: string;
}

interface CountryListProps {
  countries: Country[];
  onSelectCountry: (code: string) => void;
}

const CountryList: React.FC<CountryListProps> = ({ countries, onSelectCountry }) => {
  return (
    <div>
      <h2>Lista de Países</h2>
      <ul>
        {countries.map((country) => (
          <li key={country.code} onClick={() => onSelectCountry(country.code)}>
            {country.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
