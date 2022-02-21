import axios from 'axios';

const api = process.env.REACT_APP_BASE_API;

const getLogin = async (data) => {
  try {
    const response = await axios.post(`${api}/login`, data);

    return response;
  } catch (error) {
    return error.response;
  }
};

export default getLogin;
