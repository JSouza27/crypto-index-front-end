import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Content } from './Style';

const UpdateQuote = () => {
  const [currencies, setCurrencies] = useState();
  const [newValue, setNewValue] = useState();

  const navigate = useNavigate();

  return (
    <Container>
      <div>
        <button type="button" onClick={ () => navigate('/') }>Voltar</button>
      </div>

      <Content>
        <div>
          <label htmlFor="currency">Moeda</label>
          <input
            type="text"
            name="currency"
            id="currency"
            value={ currencies }
            onChange={ (e) => setCurrencies(e.target.value) }
          />
        </div>

        <div>
          <span>Valor atual:</span>
        </div>

        <div>
          <label htmlFor="newValue">Novo valor</label>
          <input
            type="text"
            name="newValue"
            id="newValue"
            value={ newValue }
            onChange={ (e) => setNewValue(e.target.value) }
          />
        </div>

        <div>
          <button type="button">ATUALIZAR</button>
        </div>
      </Content>
    </Container>
  );
};

export default UpdateQuote;
