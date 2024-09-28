import React, { useState } from 'react';
import { useWeather } from '../../hooks/useWeather';
import { useSearchHistory } from '../../hooks/useSearchHistory';
import WeatherDetails from './WeatherDetails';
// import { Box, Grid2, SvgIcon, Typography } from '@mui/material';
// import LoadingBox from '../Reusable/LoadingBox';
// import ErrorBox from '../Reusable/ErrorBox';
// import WeeklyForecast from '../WeeklyForecast/WeeklyForecast';
// import { ReactComponent as SplashIcon } from './assets/splash-icon.svg';
// import TodayWeather from '../TodayWeather/TodayWeather';

const WeatherSearch: React.FC = () => {
  const [todayWeather, setTodayWeather] = useState(null);
  const [todayForecast, setTodayForecast] = useState([]);
  const [weekForecast, setWeekForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [city, setCity] = useState('');
  const { weather, fetchWeather, loading, error } = useWeather();
  const { addCityToHistory } = useSearchHistory();

  const handleSearch = async () => {
    await fetchWeather(city);
    addCityToHistory(city);
  };

  // let appContent = (
  //   <Box
  //     // xs={12}
  //     display="flex"
  //     flexDirection="column"
  //     alignItems="center"
  //     justifyContent="center"
  //     sx={{
  //       width: '100%',
  //       minHeight: '500px',
  //     }}
  //   >
  //     <SvgIcon
  //       component={SplashIcon}
  //       inheritViewBox
  //       sx={{ fontSize: { xs: '100px', sm: '120px', md: '140px' } }}
  //     />
  //     <Typography
  //       variant="h4"
  //       component="h4"
  //       sx={{
  //         fontSize: { xs: '12px', sm: '14px' },
  //         color: 'rgba(255,255,255, .85)',
  //         fontFamily: 'Poppins',
  //         textAlign: 'center',
  //         margin: '2rem 0',
  //         maxWidth: '80%',
  //         lineHeight: '22px',
  //       }}
  //     >
  //       Explore current weather data and 6-day forecast of more than 200,000
  //       cities!
  //     </Typography>
  //   </Box>
  // );

  // if (todayWeather && todayForecast && weekForecast) {
  //   appContent = (
  //     <React.Fragment>
  //       <Grid2 
  //       // item 
  //         // xs={12} 
  //         // md={todayWeather ? 6 : 12}
  //         >
  //         <Grid2 
  //         // item 
  //         // xs={12}
  //         >
  //           <TodayWeather data={todayWeather} forecastList={todayForecast} />
  //         </Grid2>
  //       </Grid2>
  //       <Grid2 
  //       // item xs={12} md={6}
  //       >
  //         <WeeklyForecast data={weekForecast} />
  //       </Grid2>
  //     </React.Fragment>
  //   );
  // }

  // if (error) {
  //   appContent = (
  //     <ErrorBox
  //       margin="3rem auto"
  //       flex="inherit"
  //       errorMessage="Something went wrong"
  //     />
  //   );
  // }

  // if (isLoading) {
  //   appContent = (
  //     <Box
  //       sx={{
  //         display: 'flex',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         width: '100%',
  //         minHeight: '500px',
  //       }}
  //     >
  //       <LoadingBox value="1">
  //         <Typography
  //           variant="h3"
  //           component="h3"
  //           sx={{
  //             fontSize: { xs: '10px', sm: '12px' },
  //             color: 'rgba(255, 255, 255, .8)',
  //             lineHeight: 1,
  //             fontFamily: 'Poppins',
  //           }}
  //         >
  //           Loading...
  //         </Typography>
  //       </LoadingBox>
  //     </Box>
  //   );
  // }

  // return (
  //   <Container
  //     sx={{
  //       maxWidth: { xs: '95%', sm: '80%', md: '1100px' },
  //       width: '100%',
  //       height: '100%',
  //       margin: '0 auto',
  //       padding: '1rem 0 3rem',
  //       marginBottom: '1rem',
  //       borderRadius: {
  //         xs: 'none',
  //         sm: '0 0 1rem 1rem',
  //       },
  //       boxShadow: {
  //         xs: 'none',
  //         sm: 'rgba(0,0,0, 0.5) 0px 10px 15px -3px, rgba(0,0,0, 0.5) 0px 4px 6px -2px',
  //       },
  //     }}
  //   >
  //     <Grid container columnSpacing={2}>
  //       <Grid item xs={12}>
  //         <Box
  //           display="flex"
  //           justifyContent="space-between"
  //           alignItems="center"
  //           sx={{
  //             width: '100%',
  //             marginBottom: '1rem',
  //           }}
  //         >
  //           <Box
  //             component="img"
  //             sx={{
  //               height: { xs: '16px', sm: '22px', md: '26px' },
  //               width: 'auto',
  //             }}
  //             alt="logo"
  //             src={Logo}
  //           />

  //           <UTCDatetime />
  //           <Link
  //             href="https://github.com/Amin-Awinti"
  //             target="_blank"
  //             underline="none"
  //             sx={{ display: 'flex' }}
  //           >
  //             <GitHubIcon
  //               sx={{
  //                 fontSize: { xs: '20px', sm: '22px', md: '26px' },
  //                 color: 'white',
  //                 '&:hover': { color: '#2d95bd' },
  //               }}
  //             />
  //           </Link>
  //         </Box>
  //         <Search onSearchChange={searchChangeHandler} />
  //       </Grid>
  //       {appContent}
  //     </Grid>
  //   </Container>
  // );
  
  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Ingresa una ciudad"
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
      {error && <p>{error}</p>}
      {weather && <WeatherDetails weather={weather} />}
    </div>
  );
};

export default WeatherSearch;
