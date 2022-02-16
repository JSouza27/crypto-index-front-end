import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [btc, setBtc] = useState('');
  const [brl, setBrl] = useState('');
  const [usd, setUsd] = useState('');
  const [eur, setEur] = useState('');
  const [cad, setCad] = useState('');

  const navigate = useNavigate();

  return (
    <div>
      <div>
        <button type="button" onClick={ () => navigate('/update-quote') }>
          Atualizar valor monetário
        </button>
      </div>
      <div>
        <label htmlFor="btc">BTC</label>
        <input
          type="text"
          name="btc"
          id="btc"
          value={ btc }
          onChange={ (e) => setBtc(e.target.value) }
        />
      </div>

      <div>
        <label htmlFor="usd">USD</label>
        <input
          type="text"
          name="usd"
          id="usd"
          value={ usd }
          onChange={ (e) => setUsd(e.target.value) }
        />
      </div>

      <div>
        <label htmlFor="brl">BRL</label>
        <input
          type="text"
          name="brl"
          id="brl"
          value={ brl }
          onChange={ (e) => setBrl(e.target.value) }
        />
      </div>

      <div>
        <label htmlFor="eur">EUR</label>
        <input
          type="text"
          name="eur"
          id="eur"
          value={ eur }
          onChange={ (e) => setEur(e.target.value) }
        />
      </div>

      <div>
        <label htmlFor="cad">CAD</label>
        <input
          type="text"
          name="cad"
          id="cad"
          value={ cad }
          onChange={ (e) => setCad(e.target.value) }
        />
      </div>
    </div>
  );
};

export default Home;
