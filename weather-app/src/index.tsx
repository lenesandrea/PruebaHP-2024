import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';

const clientId = "1036597589979-9o0avej3uk7itrij4e08v27e4hvdei25.apps.googleusercontent.com"; // Sustituir con tu Client ID

ReactDOM.render(
  <GoogleOAuthProvider clientId={clientId}>
     <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);
