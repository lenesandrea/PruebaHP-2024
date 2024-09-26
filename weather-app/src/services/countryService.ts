import axios from 'axios';

export const getCountryByCode = async (countryCode: string) => {
  const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
  return response.data[0];
};
