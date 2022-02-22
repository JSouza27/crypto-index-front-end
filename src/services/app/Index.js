import axios from 'axios';

const api = process.env.REACT_APP_BASE_API;

const getQuotes = async (token) => {
  try {
    const headers = { headers: { authorization: token } };
    const response = await axios.get(`${api}/crypto/btc`, headers);

    return response;
  } catch (error) {
    return error.response;
  }
};

const getCurrencies = async (token) => {
  try {
    const headers = { headers: { authorization: token } };
    const response = await axios.get(`${api}/currencies`, headers);

    return response;
  } catch (error) {
    return error.response;
  }
};

const sendUpdate = async (token, quote) => {
  try {
    axios.defaults.headers.authorization = token;
    const response = await axios.post(`${api}/crypto/btc`, quote);

    return response;
  } catch (error) {
    return error.response;
  }
};

export {
  getQuotes,
  getCurrencies,
  sendUpdate,
};
