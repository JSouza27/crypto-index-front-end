import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCurrencies, sendUpdate } from '../../services/app/Index';

import { Button, Container, Content } from './Style';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../components/Loading';

const UpdateQuote = () => {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState('');

  const [selectedCurrency, setSelectedCurrency] = useState({});
  const [newValue, setNewValue] = useState();
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  const goHome = (e, route) => {
    e.preventDefault();
    return navigate(route);
  };

  const updateValue = async (e) => {
    e.preventDefault();

    const STATUS_CODE_OK = 200;
    const newQuote = selectedCurrency;
    newQuote.value = parseFloat(newValue);

    const { data, status } = await sendUpdate(token, newQuote);

    if (status !== STATUS_CODE_OK) {
      return toast.error(data.message);
    }

    toast.success(data.message);
    goHome(e, '/');
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const selected = options.find((option) => option.currency === value);

    setSelectedOptions(value);
    setSelectedCurrency(selected);
  };

  useEffect(() => {
    const TIME = 1000;
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

    setTimeout(() => currencies(), TIME);
  }, [navigate, token]);

  return (
    <Container>
      <div>
        <Button type="button" onClick={ (e) => goHome(e, '/') }>Voltar</Button>
      </div>

      {
        Object.keys(selectedCurrency).length
          ? (
            <Content>
              <div>
                <label htmlFor="currency">Moeda</label>
                <select
                  id="currency"
                  value={ selectedOptions }
                  onChange={ (e) => handleChange(e) }
                >
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
                  data-testid="input-newValue"
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
          ) : <Loading />
      }

    </Container>
  );
};

export default UpdateQuote;
