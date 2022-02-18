import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import getLogin from '../../services/login/Index';

import { FormContainer, Wrapper } from './Style';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const sendLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await getLogin({ email, password });

      localStorage.setItem('crypto-index-api-token', response.token);
      toast.success('Usuário logado com sucesso');

      navigate('/');
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <Wrapper>
      <FormContainer>
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
            type="password"
            name="password"
            id="password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </div>
        <button type="button" onClick={ (e) => sendLogin(e) }>ENTRAR</button>
      </FormContainer>
    </Wrapper>
  );
};

export default Login;
