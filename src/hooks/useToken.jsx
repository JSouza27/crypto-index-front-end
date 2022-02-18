import { useState } from 'react';

const useToken = () => {
  const [token, setToken] = useState('');

  const addToken = (value) => {
    localStorage.setItem('crypto-index-api-token', value);
    setToken(value);
  };

  return {
    token,
    addToken,
  };
};

export default useToken;
