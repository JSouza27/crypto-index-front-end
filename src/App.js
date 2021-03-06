import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import GlobalStyle from './GlobalStyle';
import Routes from './routes/Routes';

const App = () => {
  useEffect(() => {
    document.title = 'Crypto Index';
  });
  return (
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
    </div>
  );
};

export default App;
