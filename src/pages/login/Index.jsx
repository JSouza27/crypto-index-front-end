import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import getLogin from '../../services/login/Index';

import { FormContainer, Wrapper } from './Style';
import 'react-toastify/dist/ReactToastify.css';
import useToken from '../../hooks/useToken';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { addToken } = useToken();

  const navigate = useNavigate();

  const sendLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await getLogin({ email, password });

      addToken(response.token);
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
            type="text"
            name="password"
            id="password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </div>
        <button type="button" onClick={ (e) => sendLogin(e) }>Enviar</button>
      </FormContainer>
    </Wrapper>
  );
};

export default Login;
