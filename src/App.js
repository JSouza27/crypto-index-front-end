import React from 'react';
import { ToastContainer } from 'react-toastify';
import GlobalStyle from './GlobalStyle';
import LocationDisplay from './helpers/LocationDisplay';
import Routes from './routes/Routes';

const App = () => (
  <div>
    <Routes />
    <GlobalStyle />
    <ToastContainer
      position="top-right"
      autoClose={ 5000 }
      hideProgressBar={ false }
      newestOnTop={ false }
      closeOnClick
      rtl={ false }
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <LocationDisplay />
  </div>
);

export default App;
