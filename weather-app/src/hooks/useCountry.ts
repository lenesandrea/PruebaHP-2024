import { useState } from 'react';

interface CountryData {
  capital: string;
  population: number;
  currencies: { name: string; symbol: string }[];
}

export const useCountry = () => {
  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCountry = async (countryCode: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      if (!response.ok) {
        throw new Error('Country not found');
      }
      const data = await response.json();
      const country = data[0];
      setCountryData({
        capital: country.capital[0],
        population: country.population,
        currencies: Object.values(country.currencies),
      });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { countryData, loading, error, fetchCountry };
};
