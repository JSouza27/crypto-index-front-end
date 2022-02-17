import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuotes } from '../../services/app/Index';

import { HomeContainer, CardContainer, HomeCard } from './Style';

const Home = () => {
  const [btc, setBtc] = useState('');
  const [brl, setBrl] = useState('');
  const [usd, setUsd] = useState('');
  const [eur, setEur] = useState('');
  const [cad, setCad] = useState('');

  const navigate = useNavigate();

  const convertCurrency = (value) => {
    const converted = parseFloat(value).toFixed(2);

    return converted.toLocaleString('pt-br', { maximumSignificantDigits: 2 });
  };

  const calculate = (n) => {
    const valueBrl = parseFloat(n) * parseFloat(brl).toFixed(2);
    const valueCad = parseFloat(n) * parseFloat(cad).toFixed(2);
    const valueEurl = parseFloat(n) * parseFloat(eur).toFixed(2);
    const valueUsd = parseFloat(n) * parseFloat(usd).toFixed(2);

    setBrl(convertCurrency(valueBrl));
    setCad(convertCurrency(valueCad));
    setEur(convertCurrency(valueEurl));
    setUsd(convertCurrency(valueUsd));
  };

  const handleChange = (e) => {
    const { value } = e.target;

    calculate(value);
    setBtc(value);
  };

  const quotes = async () => {
    const token = localStorage.getItem('crypto-index-api-token');
    const localQuotes = await getQuotes(token);

    const { BRL, BTC, CAD, EUR, USD } = localQuotes.bpi;

    setBrl(convertCurrency(BRL.rate_float));
    setBtc(convertCurrency(BTC.rate_float));
    setCad(convertCurrency(CAD.rate_float));
    setEur(convertCurrency(EUR.rate_float));
    setUsd(convertCurrency(USD.rate_float));
  };

  useEffect(() => {
    const appToken = Object.keys(localStorage)
      .some((key) => key === 'crypto-index-api-token');

    if (!appToken) {
      navigate('/login');
    }

    quotes();
  });

  return (
    <HomeContainer>
      <div>
        <button type="button" onClick={ () => navigate('/update-quote') }>
          Atualizar valor monetário
        </button>
      </div>
      <HomeCard>
        <label htmlFor="btc">BTC</label>
        <input
          type="text"
          name="btc"
          id="btc"
          value={ btc }
          onChange={ (e) => handleChange(e) }
        />
      </HomeCard>

      <CardContainer>
        <HomeCard>
          <span>USD</span>
          <span>{ usd }</span>
        </HomeCard>

        <HomeCard>
          <span>BRL</span>
          <span>{ brl }</span>
        </HomeCard>

        <HomeCard>
          <span>EUR</span>
          <span>{ eur }</span>
        </HomeCard>

        <HomeCard>
          <span>CAD</span>
          <span>{ cad }</span>
        </HomeCard>
      </CardContainer>
    </HomeContainer>
  );
};

export default Home;
