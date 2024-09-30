import styled from 'styled-components';

// Contenedor principal para el clima
export const WeatherContainer = styled.div<{ isDarkMode: boolean }>`
  background-color: ${({ isDarkMode }) => (isDarkMode ? '#1f2937' : '#ffffff')};
  color: ${({ isDarkMode }) => (isDarkMode ? 'white' : 'black')};
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Contenedor para el clima actual
export const CurrentWeather = styled.div<{ isDarkMode: boolean }>`
  background-color: ${({ isDarkMode }) => (isDarkMode ? '#2d3748' : '#e0e0e0')};
  padding: 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Estilo para la temperatura
export const Temperature = styled.h2`
  font-size: 72px;
  font-weight: bold;
`;

// Estilo para el ícono del clima
export const WeatherIcon = styled.img`
  width: 80px;
  height: 80px;
`;

// Contenedor para la información del clima
export const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

// Descripción del clima
export const WeatherDescription = styled.p`
  font-size: 18px;
  color: #9ca3af;
`;

// Contenedor para la previsión del clima
export const ForecastContainer = styled.div<{ isDarkMode: boolean }>`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  background-color: ${({ isDarkMode }) => (isDarkMode ? '#2d3748' : '#f0f0f0')};
  border-radius: 8px;
  padding: 20px;
`;

// Elemento individual de la previsión
export const ForecastItem = styled.div`
  text-align: center;
`;

// Estilo para el día en la previsión
export const Day = styled.p`
  font-size: 14px;
  color: #9ca3af;
`;

// Estilo para la temperatura en la previsión
export const ForecastTemp = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

// Contenedor para la barra de búsqueda
export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

// Formulario de búsqueda
export const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  input {
    width: 300px;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #4b5563;
    margin-right: 10px;
    background-color: ${({ theme }) => (theme.isDarkMode ? '#2d3748' : '#ffffff')};
    color: ${({ theme }) => (theme.isDarkMode ? 'white' : 'black')};

    &::placeholder {
      color: ${({ theme }) => theme.placeholderColor};
    }
  }

  button {
    padding: 10px 20px;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #2563eb;
    }
  }
`;

// Contenedor del dashboard
export const DashboardContainer = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  height: 100vh;
  background-color: ${({ isDarkMode }) => (isDarkMode ? '#1f2937' : '#e0f7fa')};
`;

// Contenedor para el contenido del clima
export const WeatherContent = styled.div<{ isDarkMode: boolean }>`
  flex: 1;
  padding: 20px;
  background-color: ${({ isDarkMode }) => (isDarkMode ? '#2d3748' : '#ffffff')};
  color: ${({ isDarkMode }) => (isDarkMode ? 'white' : 'black')};
  overflow-y: auto;
`;

// Detalles del país
export const CountryDetails = styled.div<{ isDarkMode: boolean }>`
  margin-top: 20px;
  padding: 15px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, ${({ isDarkMode }) => (isDarkMode ? '0.1' : '0.3')});
  width: 100%;
  text-align: left;
  color: ${({ isDarkMode }) => (isDarkMode ? 'white' : 'black')};

  p {
    margin: 5px 0;
  }

  h4 {
    margin-bottom: 10px;
  }
`;

// Información adicional
export const AdditionalInfo = styled.div<{ isDarkMode: boolean }>`
  margin-top: 20px;
  padding: 15px;
  background-color: rgba(255, 255, 255, ${({ isDarkMode }) => (isDarkMode ? '0.1' : '0.3')});
  border-radius: 10px;
  color: ${({ isDarkMode }) => (isDarkMode ? 'white' : 'black')};
  text-align: left;

  p {
    margin: 5px 0;
  }

  h4 {
    margin-bottom: 10px;
  }
`;
