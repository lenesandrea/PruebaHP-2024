# Weather & Country Info App

A web application developed with **React** and **TypeScript** that allows users to log in using Google OAuth, search for weather information by city, and display additional details about the country to which the city belongs.

## Main Features

- **Google Login**: Secure authentication using OAuth 2.0 to access the application.
- **Weather Search**: Search for the current weather of any city, displaying temperature, humidity, and weather description.
- **Country Information**: Displays country details (such as capital, population, and currency) based on the entered city.
- **Search History**: Saves the last five searched cities, allowing quick access to previous results.
- **Logout**: Users can log out securely, removing their data from the application.
- **Responsive Design**: Compatible with both mobile and desktop devices.


## Requirements

Before running the project, ensure that the following are installed on your machine:

- **Node.js** (v14 or higher)
- **npm** (or **yarn**) as the package manager

The **Google OAuth** credentials and **OpenWeather API Key** are already configured.

## Step-by-Step Instructions to Run the Project

### 1. Clone the repository

Start by cloning the repository to your local machine:

```bash
https://github.com/lenesandrea/PruebaHP-2024
```
### 2. Install dependencies
Next, install the necessary dependencies using `npm` or `yarn`:
```
npm install
# or
yarn install
```

### 3. Set up environment variables
Ensure that the `.env` file is present in the root directory with the correct credentials already configured:

```bash
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
REACT_APP_OPENWEATHER_API_KEY=your-openweather-api-key
```
### 4. Run the application in development mode
Start the application locally using the following command:

```bash
npm start
# or
yarn start

