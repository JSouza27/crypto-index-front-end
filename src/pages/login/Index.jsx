import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import getLogin from '../../services/login/Index';
import logoPng from '../../assets/logo.png';

import { FormContainer, LogoContainer, Wrapper } from './Style';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const sendLogin = async (e) => {
    e.preventDefault();
    const STATUS_CODE_OK = 200;

    const { status, data } = await getLogin({ email, password });
    console.log({ status, data });
    if (status !== STATUS_CODE_OK) {
      toast.error(data.message);
    } else {
      localStorage.setItem('crypto-index-api-token', data.token);
      toast.success('Usuário logado com sucesso');
      navigate('/');
    }
  };

  return (
    <Wrapper>
      <LogoContainer>
        <img src={ logoPng } alt="logo" />
      </LogoContainer>
      <FormContainer>
        <div>
          <label htmlFor="email">Email</label>
          <input
            data-testid="email-input"
            type="email"
            name="email"
            id="email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input
            data-testid="password-input"
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
