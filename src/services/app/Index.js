import axios from 'axios';

const url = process.env.REACT_APP_BASE_API;

const getQuotes = async (token) => {
  const headers = { headers: { authorization: token } };
  const response = await axios.get(`${url}/crypto/btc`, headers);

  return response.data;
};

export default getQuotes;
