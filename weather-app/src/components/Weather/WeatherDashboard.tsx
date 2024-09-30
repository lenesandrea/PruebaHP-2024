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
import WeatherDetails from './WeatherDetails';

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

const HistoryDropdown = styled.select`
  padding: 5px;
  font-size: 1rem;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #4b5563;
  background-color: ${({ theme }) => (theme.isDarkMode ? '#2d3748' : '#ffffff')};
  color: ${({ theme }) => (!theme.isDarkMode ? '#2d3748' : '#ffffff')};

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
  const { history, addCityToHistory } = useSearchHistory();

  const { user, logout } = useAuth();
  

  // Use the custom hook to get the current city
  const {
    city: currentCity,
    loading: locationLoading,
    error: locationError,
  } = useCurrentLocation();

  const {
    weatherData,
    loading: weatherLoading,
    error: weatherError,
  } = useWeather((searchCity || currentCity)!);

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

  if (!user) {
    return <div>Por favor, inicia sesión para buscar el clima.</div>;
  }

  return (
    <DashboardContainer>
      <ButtonContainer>
        <PowerButton onClick={logout}>
          <FontAwesomeIcon icon={faPowerOff} />
        </PowerButton>
        <ThemeToggleButton/>
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
            <HistoryDropdown
              value={searchCity}
              onChange={handleHistoryClick}
            >
              <option value="" disabled>
                Historial
              </option>
              {history.map((historyCity, index) => (
                <option key={index} value={historyCity}>
                  {historyCity}
                </option>
              ))}
            </HistoryDropdown>
          )}
        </SearchBarContainer>

        {locationError && <AlertBox type="error" message={locationError} />}
        {locationLoading && <p>Cargando ubicación...</p>}
        {weatherError && <AlertBox type="error" message={weatherError} />}
        {weatherLoading && <p>Cargando clima...</p>}
        <WeatherDetails weather={weatherData}/>
      </DasboardContentContainer>
    </DashboardContainer>
  );
};

export default WeatherDashboard;
