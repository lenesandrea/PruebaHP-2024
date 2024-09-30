import styled from 'styled-components';

// Contenedor principal para el clima
export const WeatherContainer = styled.div`
  background-color: ${({ theme }) => (theme.isDarkMode ? '#1f2937' : '#ffffff')};
  color: ${({ theme }) => (theme.isDarkMode ? 'white' : 'black')};
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Contenedor para el clima actual
export const CurrentWeather = styled.div`
  background-color: ${({ theme }) => (theme.isDarkMode ? '#2d3748' : '#e0e0e0')};
  padding: 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Estilo para la temperatura
export const Temperature = styled.h2`
  font-size: 3rem;
  line-height: 3rem;
  font-weight: bold;
  margin-bottom: 0;
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

export const WeatherInfoTemp = styled.div`
  margin-top: 20px;
  text-align: center;
  @media (max-width: 600px) {
      width: 100%;
  }
`;

// Descripción del clima
export const WeatherDescription = styled.p`
  font-size: 18px;
  color: #9ca3af;
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
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: unset;
  }

  `;
  
  // Formulario de búsqueda
export const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  position: relative;

  input {
    min-width: 250px;
    padding: 10px;
    padding-left: 35px;
    border-radius: 8px;
    font-size: 1rem;
    border: 1px solid #4b5563;
    margin-right: 10px;
    background-color: ${({ theme }) => (theme.isDarkMode ? '#2d3748' : '#ffffff')};
    color: ${({ theme }) => (theme.isDarkMode ? 'white' : 'black')};

    &::placeholder {
      color: ${({ theme }) => theme.placeholderColor};
    }
  }

  button {
    font-size: 1rem;
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
  
  @media (max-width: 600px) {
    justify-content: space-between;
  }
`;

// Contenedor del dashboard
export const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => (theme.isDarkMode ? '#1f2937' : '#e0f7fa')};
`;

// Contenedor para el contenido del clima
export const WeatherContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => (theme.isDarkMode ? '#2d3748' : '#ffffff')};
  color: ${({ theme }) => (theme.isDarkMode ? 'white' : 'black')};
  overflow-y: auto;
`;

// Detalles del país
export const CountryDetails = styled.div`
  margin-top: 20px;
  padding: 15px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, ${({ theme }) => (theme.isDarkMode ? '0.1' : '0.3')});
  width: 100%;
  text-align: left;
  color: ${({ theme }) => (theme.isDarkMode ? 'white' : 'black')};

  p {
    margin: 5px 0;
  }

  h4 {
    margin-bottom: 10px;
  }
`;

// Información adicional
export const AdditionalInfo = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: rgba(255, 255, 255, ${({ theme }) => (theme.isDarkMode ? '0.1' : '0.3')});
  border-radius: 10px;
  color: ${({ theme }) => (theme.isDarkMode ? 'white' : 'black')};
  text-align: left;

  p {
    margin: 5px 0;
  }

  h4 {
    margin-bottom: 10px;
  }
`;
