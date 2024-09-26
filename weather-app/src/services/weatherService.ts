import axios from 'axios';

const API_KEY = 'TU_API_KEY'; // Reemplaza con tu API Key de OpenWeather
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeatherByCity = async (city: string) => {
  const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
  return response.data;
};
