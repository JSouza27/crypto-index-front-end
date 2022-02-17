import axios from 'axios';

const getLogin = async (data) => {
  const url = process.env.REACT_APP_BASE_API;
  const response = await axios.post(`${url}/login`, data);

  return response.data;
};

export default getLogin;
