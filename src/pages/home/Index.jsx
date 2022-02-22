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
    e.preventDefault();
    const { value } = e.target;

    if (value === '') {
      calculate(0);
      setBtc(0);
    }

    if (value !== '') {
      calculate(value);
      setBtc(value);
    }
  };

  const updateCurrencies = (baseState) => {
    setBrl(baseState.BRL);
    setBtc(baseState.BTC);
    setCad(baseState.CAD);
    setEur(baseState.EUR);
    setUsd(baseState.USD);
  };

  useEffect(() => {
    const appToken = Object.keys(localStorage)
      .some((key) => key === 'crypto-index-api-token');

    if (!appToken) {
      navigate('/login');
    }

    (async () => {
      const token = localStorage.getItem('crypto-index-api-token');
      const localQuotes = await getQuotes(token);

      const { BRL, BTC, CAD, EUR, USD } = localQuotes.data.bpi;

      const currencies = {
        BRL: convertCurrency(BRL.rate_float),
        BTC: convertCurrency(BTC.rate_float),
        CAD: convertCurrency(CAD.rate_float),
        EUR: convertCurrency(EUR.rate_float),
        USD: convertCurrency(USD.rate_float),
      };

      setBaseValue(currencies);
    })();
  }, [navigate]);

  useEffect(() => {
    updateCurrencies(baseValue);
  }, [baseValue]);

  return (
    <HomeContainer>
      {
        Object.keys(baseValue).length
          ? (
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
                  data-testid="btc-input"
                  type="number"
                  name="btc"
                  id="btc"
                  value={ btc }
                  min={ 0 }
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
                  <span data-testid="usd-value">{ usd }</span>
                </HomeCard>

                <HomeCard>
                  <div>
                    <RiMoneyDollarCircleFill size={ 35 } color="#0b5ba1" />
                    <span>BRL</span>
                    <span>REAL</span>
                  </div>
                  <span data-testid="brl-value">{ brl }</span>
                </HomeCard>

                <HomeCard>
                  <div>
                    <RiMoneyDollarCircleFill size={ 35 } color="#0b5ba1" />
                    <span>EUR</span>
                    <span>EURO</span>
                  </div>
                  <span data-testid="eur-value">{ eur }</span>
                </HomeCard>

                <HomeCard>
                  <div>
                    <RiMoneyDollarCircleFill size={ 35 } color="#0b5ba1" />
                    <span>CAD</span>
                    <span>DOLLAR CANADENSE</span>
                  </div>
                  <span data-testid="cad-value">{ cad }</span>
                </HomeCard>
              </CardContainer>
            </HomeContent>
          ) : (
            <div data-testid="loading">Loading...</div>
          )
      }
    </HomeContainer>
  );
};

export default Home;
