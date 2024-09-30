import React, { useState, useEffect } from 'react';
import useWeather from '../../hooks/useWeather';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
    WeatherContainer,
    CurrentWeather,
    Temperature,
    WeatherIcon,
    WeatherInfo,
    WeatherDescription,
    CountryDetails,
    SearchForm,
    SearchBarContainer,
} from '../../assets/styles/WeatherStyle';
import ThemeToggleButton from './../UI/ThemeToggleButton';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

type CountryData = {
    capital: string[];
    population: number;
    currencies: { [key: string]: { name: string; symbol: string } };
    region: string;
};

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.background};
  background-image: url(${({ theme }) => theme.backgroundImage});
  background-size: cover;
  background-position: center;
  color: ${({ theme }) => theme.color};
  transition: all 0.3s ease;
  position: relative; /* Asegurando que sea relativo para el botón fijo */
`;

const ButtonContainer = styled.div`
  display: flex;
  position: fixed; /* Cambiado a 'fixed' */
  top: 20px; /* Ajustar la altura si es necesario */
  left: 20px; /* Cambiado de 'right' a 'left' */
  z-index: 1000; /* Asegurando que esté en la parte superior */
  gap: 10px; /* Espacio entre los botones */
`;

const PowerButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.color}; /* Asegúrate de que este color sea visible */
  cursor: pointer;
  font-size: 1.5rem; /* Tamaño del ícono */

  &:hover {
    color: red; /* Cambiar color al pasar el mouse */
  }
`;

const HistoryDropdown = styled.select`
  padding: 5px;
  font-size: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.color};
`;

const WeatherDashboard: React.FC = () => {
    const [city, setCity] = useState('Barranquilla'); 
    const [history, setHistory] = useState<string[]>([]);
    const [showCountryInfo, setShowCountryInfo] = useState(false); 
    const [countryData, setCountryData] = useState<CountryData | null>(null); 
    const { user, logout } = useAuth(); 
    const { isDarkTheme, toggleTheme } = useTheme();
    const apiKey = process.env.API_KEY_OPEN_WEATHER!;
    const { weatherData, loading, error } = useWeather(city, apiKey);

    useEffect(() => {
        const savedHistory = localStorage.getItem('searchHistory');
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

    useEffect(() => {
        if (weatherData) {
            fetch(`https://restcountries.com/v3.1/name/${weatherData.sys.country}`)
                .then((response) => response.json())
                .then((data) => setCountryData(data[0]));
        }
    }, [weatherData]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (city && !history.includes(city)) {
            const updatedHistory = [...history, city].slice(-5);
            setHistory(updatedHistory);
            localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
        }
    };

    const handleHistoryClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCity(e.target.value);
    };

    const toggleCountryInfo = () => {
        setShowCountryInfo(!showCountryInfo);
    };

    if (!user) {
        return <div>Por favor, inicia sesión para buscar el clima.</div>;
    }

    return (
        <DashboardContainer>
            <ButtonContainer>
                <PowerButton onClick={logout}>
                    <FontAwesomeIcon icon={faPowerOff} />
                </PowerButton>
                
                <ThemeToggleButton isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
            </ButtonContainer>

            <Title>Weather Dashboard</Title>

            <SearchBarContainer>
                <SearchForm onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Ingrese una ciudad"
                        required
                    />
                    <button type="submit">Buscar</button>
                </SearchForm>

                {history.length > 0 && (
                    <HistoryDropdown value={city} onChange={handleHistoryClick}>
                        <option value="" disabled>Historial</option>
                        {history.map((historyCity, index) => (
                            <option key={index} value={historyCity}>{historyCity}</option>
                        ))}
                    </HistoryDropdown>
                )}
            </SearchBarContainer>

            {loading && <p>Cargando...</p>}
            {error && <p>Error: {error}</p>}

            {weatherData && (
                <WeatherContainer isDarkMode={isDarkTheme}>
                    <CurrentWeather isDarkMode={isDarkTheme}>
                        <WeatherInfo>
                            <h3>{weatherData.name},
                                <span onClick={toggleCountryInfo} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                                    {weatherData.sys.country}
                                </span>
                            </h3>
                            <WeatherDescription>{weatherData.weather[0].description}</WeatherDescription>
                            <p>Humedad: {weatherData.main.humidity}%</p>
                            <p>Viento: {weatherData.wind.speed} kph</p>
                            <p>Presión: {weatherData.main.pressure} hPa</p>
                        </WeatherInfo>
                        <div>
                            <Temperature>{Math.round(weatherData.main.temp)}°C</Temperature>
                            <WeatherIcon
                                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                                alt="weather icon"
                            />
                        </div>
                    </CurrentWeather>

                    {showCountryInfo && countryData && (
                        <CountryDetails isDarkMode={isDarkTheme}>
                            <h4>Información del País:</h4>
                            <p><strong>Capital:</strong> {countryData.capital[0]}</p>
                            <p><strong>Población:</strong> {countryData.population}</p>
                            {countryData.currencies && Object.keys(countryData.currencies).length > 0 && (
                                <p><strong>Moneda:</strong>
                                    {Object.values(countryData.currencies)[0]?.name} ({Object.values(countryData.currencies)[0]?.symbol})
                                </p>
                            )}
                            <p><strong>Región:</strong> {countryData.region}</p>
                        </CountryDetails>
                    )}
                </WeatherContainer>
            )}
        </DashboardContainer>
    );
};

export default WeatherDashboard;
