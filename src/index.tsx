import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { APIProvider } from '@vis.gl/react-google-maps';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import './i18next/index.ts';
import './main.css';
import { persistor, store } from './redux/store';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const solutionChannel = 'GMP_devsite_samples_v3_rgmautocomplete';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <APIProvider apiKey={apiKey} solutionChannel={solutionChannel}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
            <ToastContainer position="top-right" />
          </PersistGate>
        </Provider>
      </APIProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
