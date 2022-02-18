import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBitcoin } from 'react-icons/fa';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { getQuotes } from '../../services/app/Index';

import { HomeContainer, CardContainer, HomeCard, HomeContent } from './Style';

const Home = () => {
  const [baseValue, setBaseValue] = useState({});

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
    const valueBrl = parseFloat(n) * parseFloat(baseValue.BRL);
    const valueCad = parseFloat(n) * parseFloat(baseValue.CAD);
    const valueEurl = parseFloat(n) * parseFloat(baseValue.EUR);
    const valueUsd = parseFloat(n) * parseFloat(baseValue.USD);

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

  useEffect(() => {
    const appToken = Object.keys(localStorage)
      .some((key) => key === 'crypto-index-api-token');

    if (!appToken) {
      navigate('/login');
    }

    const quotes = async () => {
      const token = localStorage.getItem('crypto-index-api-token');
      const localQuotes = await getQuotes(token);

      const { BRL, BTC, CAD, EUR, USD } = localQuotes.bpi;

      const currencies = {
        BRL: convertCurrency(BRL.rate_float),
        BTC: convertCurrency(BTC.rate_float),
        CAD: convertCurrency(CAD.rate_float),
        EUR: convertCurrency(EUR.rate_float),
        USD: convertCurrency(USD.rate_float),
      };

      setBrl(currencies.BRL);
      setBtc(currencies.BTC);
      setCad(currencies.CAD);
      setEur(currencies.EUR);
      setUsd(currencies.USD);

      setBaseValue(currencies);
    };

    quotes();
  }, [navigate]);

  return (
    <HomeContainer>
      <HomeContent>
        <div>
          <button type="button" onClick={ () => navigate('/update-quote') }>
            Atualizar valor monetário
          </button>
        </div>
        <HomeCard>
          <div>
            <FaBitcoin size={ 35 } color="#f7931a" />
            <span>BTC</span>
            <span>BITCOIN</span>
          </div>
          <input
            type="number"
            name="btc"
            id="btc"
            value={ btc }
            onChange={ (e) => handleChange(e) }
          />
        </HomeCard>

        <CardContainer>
          <HomeCard>
            <div>
              <RiMoneyDollarCircleFill size={ 35 } color="#0b5ba1" />
              <span>USD</span>
              <span>DOLLAR</span>
            </div>
            <span>{ usd }</span>
          </HomeCard>

          <HomeCard>
            <div>
              <RiMoneyDollarCircleFill size={ 35 } color="#0b5ba1" />
              <span>BRL</span>
              <span>REAL</span>
            </div>
            <span>{ brl }</span>
          </HomeCard>

          <HomeCard>
            <div>
              <RiMoneyDollarCircleFill size={ 35 } color="#0b5ba1" />
              <span>EUR</span>
              <span>EURO</span>
            </div>
            <span>{ eur }</span>
          </HomeCard>

          <HomeCard>
            <div>
              <RiMoneyDollarCircleFill size={ 35 } color="#0b5ba1" />
              <span>CAD</span>
              <span>DOLLAR CANADENSE</span>
            </div>
            <span>{ cad }</span>
          </HomeCard>
        </CardContainer>
      </HomeContent>
    </HomeContainer>
  );
};

export default Home;
