import React, { useState } from 'react';

const UpdateQuote = () => {
  const [currencies, setCurrencies] = useState();
  const [newValue, setNewValue] = useState();

  return (
    <div>
      <div>
        <button type="button">Voltar</button>
      </div>

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
    </div>
  );
};

export default UpdateQuote;
