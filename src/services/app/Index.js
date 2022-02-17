import axios from 'axios';

const url = process.env.REACT_APP_BASE_API;

const getQuotes = async (token) => {
  const headers = { headers: { authorization: token } };
  const response = await axios.get(`${url}/crypto/btc`, headers);

  return response.data;
};

const getCurrencies = async (token) => {
  const headers = { headers: { authorization: token } };
  const response = await axios.get(`${url}/currencies`, headers);

  return response.data;
};

const sendUpdate = async (token, quote) => {
  axios.defaults.headers.authorization = token;
  const response = await axios.post(`${url}/crypto/btc`, quote);

  return response;
};

export {
  getQuotes,
  getCurrencies,
  sendUpdate,
};
