import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [passwrod, setPassword] = useState('');

  const navigate = useNavigate();

  const sendLogin = (e) => {
    e.preventDefault();

    try {
      navigate('/home');
      console.log('entrei');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
      </div>
      <div>
        <label htmlFor="password">Senha</label>
        <input
          type="text"
          name="password"
          id="password"
          value={ passwrod }
          onChange={ (e) => setPassword(e.target.value) }
        />
      </div>
      <button type="button" onClick={ (e) => sendLogin(e) }>Enviar</button>
    </form>
  );
};

export default Login;
