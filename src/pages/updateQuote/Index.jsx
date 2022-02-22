import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCurrencies, sendUpdate } from '../../services/app/Index';

import { Button, Container, Content } from './Style';
import 'react-toastify/dist/ReactToastify.css';

const UpdateQuote = () => {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState('');

  const [selectedCurrency, setSelectedCurrency] = useState({});
  const [newValue, setNewValue] = useState();
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  const updateValue = async (e) => {
    e.preventDefault();

    const newQuote = selectedCurrency;
    newQuote.value = parseFloat(newValue);

    try {
      const response = await sendUpdate(token, newQuote);

      toast.success(response.data.message);
      navigate('/');
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const selected = options.find((option) => option.currency === value);

    setSelectedOptions(value);
    setSelectedCurrency(selected);
  };

  useEffect(() => {
    const appToken = Object.keys(localStorage)
      .some((key) => key === 'crypto-index-api-token');

    if (!appToken) {
      navigate('/login');
    }

    const currencies = async () => {
      const getToken = localStorage.getItem('crypto-index-api-token');
      const { data } = await getCurrencies(token);

      const keys = Object.keys(data);

      const convertedCurrencies = keys.reduce((acc, cur) => {
        const obj = {
          currency: cur,
          value: parseFloat(data[cur]).toFixed(2),
        };

        acc.push(obj);

        return acc;
      }, []);

      setOptions(convertedCurrencies);
      setSelectedOptions(convertedCurrencies[0].currency);
      setSelectedCurrency(convertedCurrencies[0]);
      setToken(getToken);
    };

    currencies();
  }, [navigate, token]);

  return (
    <Container>
      <div>
        <Button type="button" onClick={ () => navigate('/') }>Voltar</Button>
      </div>

      <Content>
        <div>
          <label htmlFor="currency">Moeda</label>
          <select value={ selectedOptions } onChange={ (e) => handleChange(e) }>
            {
              options.map(({ currency }) => (
                <option key={ currency } value={ currency }>{ currency }</option>
              ))
            }
          </select>
        </div>

        <div>
          <span>{`Valor atual: R$ ${selectedCurrency.value}`}</span>
        </div>

        <div>
          <label htmlFor="newValue">Novo valor</label>
          <input
            type="number"
            name="newValue"
            id="newValue"
            value={ newValue }
            onChange={ (e) => setNewValue(e.target.value) }
          />
        </div>

        <div>
          <Button type="button" onClick={ (e) => updateValue(e) }>ATUALIZAR</Button>
        </div>
      </Content>
    </Container>
  );
};

export default UpdateQuote;
