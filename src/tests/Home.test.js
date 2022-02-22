import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import axios from 'axios';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import currencies from '../helpers/bpi.json';
import '@testing-library/jest-dom';

jest.mock('axios');

const quotes = {
  data: {
    bpi: currencies,
  },
  status: 200,
};

const STORAGE_KEY = 'crypto-index-api-token';

describe('Testando página home', () => {
  describe('A página deve conter um card "BTC"', () => {
    const LOADING = 'Loading...';

    beforeEach(() => {
      localStorage.setItem(STORAGE_KEY, 'cc69f7d69921e3b5');
      axios.get.mockReturnValue(quotes);
    });

    afterEach(() => jest.clearAllMocks());

    it('verifica se o "Loading" aparece na tela', () => {
      renderWithRouter(<App />, { route: '/' });

      const loading = screen.getByText(LOADING);
      expect(loading).toBeInTheDocument();
    });

    it('Verifica se o card "BTC" existe na página', async () => {
      renderWithRouter(<App />, { route: '/' });

      await waitForElementToBeRemoved(
        screen.queryByText(LOADING),
      );

      const cardBTC = screen.getByText(/BTC/i);
      expect(cardBTC).toBeInTheDocument();
    });

    it('O card deve conter um input onde será possível digitar um valor em Bitcoins',
      async () => {
        renderWithRouter(<App />, { route: '/' });

        await waitForElementToBeRemoved(
          screen.queryByText(LOADING),
        );

        const input = await screen.findByTestId('btc-input');

        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(1);

        useEvent.clear(input);
        useEvent.type(input, '2');

        expect(input).toHaveValue(2);
      });

    it('Verifica se renderiza os cards "USD", "BRL", "EUR" e "CAD"', async () => {
      renderWithRouter(<App />, { route: '/' });

      await waitForElementToBeRemoved(
        screen.queryByText(LOADING),
      );

      const cardUSD = screen.queryByText('USD');
      const cardBRL = screen.queryByText('BRL');
      const cardEUR = screen.queryByText('EUR');
      const cardCAD = screen.queryByText('CAD');

      expect(cardUSD).toBeInTheDocument();
      expect(cardBRL).toBeInTheDocument();
      expect(cardEUR).toBeInTheDocument();
      expect(cardCAD).toBeInTheDocument();
    });

    it('Os cards "USD", "BRL", "EUR" e "CAD" devem ter seus valores renderizados',
      async () => {
        renderWithRouter(<App />, { route: '/' });

        await waitForElementToBeRemoved(
          screen.queryByText(LOADING),
        );

        const valueUSD = screen.queryByTestId('usd-value');
        const valueBRL = screen.queryByTestId('brl-value');
        const valueEUR = screen.queryByTestId('eur-value');
        const valueCAD = screen.queryByTestId('cad-value');

        expect(valueUSD).toBeInTheDocument();
        expect(valueBRL).toBeInTheDocument();
        expect(valueEUR).toBeInTheDocument();
        expect(valueCAD).toBeInTheDocument();
      });

    it('Os cards "USD", "BRL", "EUR" e "CAD" devem ter seus valores convertidos',
      async () => {
        const { BRL, CAD, EUR, USD } = quotes.data.bpi;
        renderWithRouter(<App />, { route: '/' });

        await waitForElementToBeRemoved(
          screen.queryByText(LOADING),
        );

        const valueUSD = screen.queryByTestId('usd-value');
        const valueBRL = screen.queryByTestId('brl-value');
        const valueEUR = screen.queryByTestId('eur-value');
        const valueCAD = screen.queryByTestId('cad-value');

        expect(valueUSD).toHaveTextContent(parseFloat(USD.rate_float));
        expect(valueBRL).toHaveTextContent(parseFloat(BRL.rate_float));
        expect(valueEUR).toHaveTextContent(parseFloat(EUR.rate_float));
        expect(valueCAD).toHaveTextContent(parseFloat(CAD.rate_float));
      });

    it('Ao digitar um valor no input os campos devem ser alterados',
      async () => {
        const { USD } = quotes.data.bpi;
        const newValue = parseFloat(USD.rate_float) * 2;

        renderWithRouter(<App />, { route: '/' });

        await waitForElementToBeRemoved(
          screen.queryByText(LOADING),
        );

        const valueUSD = screen.queryByTestId('usd-value');
        const input = await screen.findByTestId('btc-input');

        useEvent.clear(input);
        useEvent.type(input, '2');

        expect(input).toHaveValue(2);
        expect(valueUSD).toHaveTextContent(newValue);
      });

    it('Deve existir um botão "Atualizar valor monetário"', async () => {
      renderWithRouter(<App />, { route: '/' });

      await waitForElementToBeRemoved(
        screen.queryByText(LOADING),
      );

      const button = screen.getByRole('button');

      expect(button).toBeInTheDocument();
    });
  });
});

describe('Testanto o redirencionamento de página', () => {
  describe('Verifica se a página é redirencionada caso não tenha logado', () => {
    beforeEach(() => {
      localStorage.removeItem(STORAGE_KEY);
    });

    it('Caso não tenha o token a página deve ser redirencionada para "/login"', () => {
      renderWithRouter(<App />, { route: '/' });

      const emailText = screen.getByText(/email/i);
      expect(emailText).toBeInTheDocument();
    });
  });
});
