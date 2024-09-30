import React, { useState, useEffect } from 'react';
import useWeather from '../../hooks/useWeather';
import useCurrentLocation from '../../hooks/useCurrentLocation'; // Import the custom hook
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
    WeatherInfoTemp,
} from '../../assets/styles/WeatherStyle';
import ThemeToggleButton from '../UI/ThemeToggleButton';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import AlertBox from '../UI/AlertBox';
import { useSearchHistory } from '../../hooks/useSearchHistory';

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
  position: relative;
`;

const DasboardContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  max-width: 800px;
`;

const ButtonContainer = styled.div`
  display: flex;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  gap: 10px;
`;

const PowerButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.color};
  cursor: pointer;
  font-size: 1.5rem;

  &:hover {
    color: red;
  }
`;

const HistoryDropdown = styled.select<{ isDarkMode: boolean }>`
  padding: 5px;
  font-size: 1rem;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #4b5563;
  background-color: ${({ isDarkMode }) => (isDarkMode ? '#2d3748' : '#ffffff')};
  color: ${({ isDarkMode }) => (!isDarkMode ? '#2d3748' : '#ffffff')};

//   @media (max-width: 600px) {
//     align-self: flex-start;
//   }

`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.color};
  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #4b5563;
  font-size: 1.1rem;
`;

const WeatherDashboard: React.FC = () => {
    const [city, setCity] = useState(''); 
    const [searchCity, setSearchCity] = useState(''); // Remove initial value, set dynamically from location
    const {history, addCityToHistory}= useSearchHistory();
    
    const [showCountryInfo, setShowCountryInfo] = useState(false);
    const [countryData, setCountryData] = useState<CountryData | null>(null);
    const { user, logout } = useAuth();
    const { isDarkTheme, toggleTheme } = useTheme();
    const apiKey = process.env.API_KEY_OPEN_WEATHER!;
    
    // Use the custom hook to get the current city
    const { city: currentCity, loading: locationLoading, error: locationError } = useCurrentLocation(apiKey);
    
    const { weatherData, loading: weatherLoading, error: weatherError } = useWeather((searchCity || currentCity)!, apiKey);

    // Once the current city is fetched, trigger the weather search
    useEffect(() => {
        if (currentCity) {
            setCity(currentCity);
            setSearchCity(currentCity); // Automatically set the search city
        }
    }, [currentCity]);

    useEffect(() => {
        if (weatherData) {
            const { name: cityName } = weatherData;
            if (cityName && !history.includes(cityName)) {
                addCityToHistory(cityName);
            }
            fetch(`https://restcountries.com/v3.1/name/${weatherData.sys.country}`)
                .then((response) => response.json())
                .then((data) => setCountryData(data[0]));
        }
    }, [weatherData, history, addCityToHistory]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchCity(city); // Trigger weather fetch with input city
    };

    const handleHistoryClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCity = e.target.value;
        setCity(selectedCity);
        setSearchCity(selectedCity); // Trigger weather fetch with history city
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
            <DasboardContentContainer>
                <SearchBarContainer>
                    <SearchForm onSubmit={handleSearch}>
                      <SearchIcon icon={faMagnifyingGlass} />
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
                        <HistoryDropdown value={searchCity} onChange={handleHistoryClick} isDarkMode={isDarkTheme}>
                            <option value="" disabled>Historial</option>
                            {history.map((historyCity, index) => (
                                <option key={index} value={historyCity}>{historyCity}</option>
                            ))}
                        </HistoryDropdown>
                    )}
                </SearchBarContainer>

                {locationError && <AlertBox type='error' message={locationError} />}
                {locationLoading && <p>Cargando ubicación...</p>}
                {weatherError && <AlertBox type='error' message={weatherError} />}
                {weatherLoading && <p>Cargando clima...</p>}

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
                            <WeatherInfoTemp>
                                <Temperature>{Math.round(weatherData.main.temp)}°C</Temperature>
                                <WeatherIcon
                                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                                    alt="weather icon"
                                />
                            </WeatherInfoTemp>
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
            </DasboardContentContainer>
        </DashboardContainer>
    );
};

export default WeatherDashboard;
