import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import axios from 'axios';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import '@testing-library/jest-dom';

jest.mock('axios');

const EMAIL_ID = 'email-input';
const PASSWORD_ID = 'password-input';

describe('Testando página de login', () => {
  describe('Verifica se os componentes são renderizados na tela', () => {
    it('Renderiza o texto "Email"', () => {
      renderWithRouter(<App />, { route: '/login' });

      const textEmail = screen.getByText('Email');
      expect(textEmail).toBeInTheDocument();
    });

    it('Renderiza o texto "Senha"', () => {
      renderWithRouter(<App />, { route: '/login' });

      const textPassword = screen.getByText('Senha');
      expect(textPassword).toBeInTheDocument();
    });

    it('Renderiza o botão "Entrar"', () => {
      renderWithRouter(<App />, { route: '/login' });

      const sendButton = screen.getByRole('button');
      expect(sendButton).toBeInTheDocument();
      expect(sendButton).toHaveTextContent('ENTRAR');
    });

    it('Renderiza os inputs', () => {
      renderWithRouter(<App />, { route: '/login' });

      const inputEmail = screen.getByTestId(EMAIL_ID);
      const inputPassword = screen.getByTestId(PASSWORD_ID);

      expect(inputEmail).toBeInTheDocument();
      expect(inputEmail).toHaveAttribute('type', 'email');

      expect(inputPassword).toBeInTheDocument();
      expect(inputPassword).toHaveAttribute('type', 'password');
    });
  });

  afterEach(() => jest.clearAllMocks());

  describe('Verifica os comportamentos da página', () => {
    it('Verifica se é possível digitar nos inputs', () => {
      renderWithRouter(<App />, { route: '/login' });

      const email = 'teste@test.com';
      const password = '123456';

      const inputEmail = screen.getByTestId(EMAIL_ID);
      const inputPassword = screen.getByTestId(PASSWORD_ID);

      useEvent.type(inputEmail, email);
      useEvent.type(inputPassword, password);

      expect(inputEmail).toHaveValue(email);
      expect(inputPassword).toHaveValue(password);
    });

    it('Retorna um erro quando usuário passa o email ou senha inválido',
      async () => {
        const response = {
          data: {
            message: 'Campos inválidos',
          },
          status: 400,
        };

        axios.post.mockReturnValue(response);

        renderWithRouter(<App />, { route: '/login' });

        const inputEmail = screen.getByTestId(EMAIL_ID);
        const inputPassword = screen.getByTestId(PASSWORD_ID);
        const sendButton = screen.getByRole('button');

        useEvent.type(inputEmail, 'teste');
        useEvent.type(inputPassword, '123456');
        useEvent.click(sendButton);

        expect(axios.post).toHaveBeenCalled();
      });

    it('Redirenciona para a página Home quando é passado email e senha correta',
      async () => {
        const response = {
          data: {
            token: 'cc69f7d69921e3b5',
          },
          status: 200,
        };

        const responseHome = {
          data: {
            bpi: {
              USD: {
                code: 'USD',
                rate: '37,678.6301',
                description: 'United States Dollar',
                rate_float: 37678.6301,
              },
              BTC: {
                code: 'BTC',
                rate: '1.0000',
                description: 'Bitcoin',
                rate_float: 1,
              },
              BRL: {
                code: 'BRL',
                rate: '376,786.301',
                description: 'Brazilian Real',
                rate_float: 376786.30100000004,
              },
              EUR: {
                code: 'EUR',
                rate: '34,664.34',
                description: 'Euro',
                rate_float: 34664.339692,
              },
              CAD: {
                code: 'CAD',
                rate: '54,257.227',
                description: 'Canadian Dollar',
                rate_float: 54257.227344,
              },
            },
          },
          status: 200,
        };

        axios.post.mockReturnValue(response);
        axios.get.mockReturnValue(responseHome);

        renderWithRouter(<App />, { route: '/login' });

        const inputEmail = screen.getByTestId(EMAIL_ID);
        const inputPassword = screen.getByTestId(PASSWORD_ID);
        const sendButton = screen.getByRole('button');

        useEvent.type(inputEmail, 'email@email.com');
        useEvent.type(inputPassword, '135982');
        useEvent.click(sendButton);

        expect(axios.post).toHaveBeenCalled();
        expect(axios.post).toHaveReturnedWith(response);

        waitFor(async () => {
          expect(axios.get).toHaveBeenCalled();
          expect(axios.get).toHaveReturnedWith(responseHome);

          const text = await screen.findByText(/BTC/i);
          expect(text).toBeInTheDocument();
        });
      });
  });
});
