import React from 'react';
import { fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import axios from 'axios';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import currencies from '../helpers/bpi.json';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

const quotes = {
  data: {
    bpi: currencies,
  },
  status: 200,
};

const mockCurrencies = {
  data: {
    BRL: '10.00',
    EUR: '0.920',
    CAD: '1.440',
  },
  status: 200,
};

const mockSendUpdate = {
  data: {
    message: 'Valor alterado com sucesso!',
  },
  status: 200,
};

const mockErrorUpdate = {
  data: {
    message: 'Valor inválido',
  },
  status: 400,
};

const STORAGE_KEY = 'crypto-index-api-token';
const LOADING = 'Loading...';

const route = '/update-quote';
const inputId = 'input-newValue';

describe('Testando página update-quote', () => {
  beforeEach(() => {
    axios.get.mockReturnValue(mockCurrencies);
  });

  describe('Verifica se a página é redirencionada caso não tenha logado ', () => {
    beforeEach(() => {
      localStorage.removeItem(STORAGE_KEY);
    });

    it('Caso não tenha o token a página deve ser redirencionada para "/login"', () => {
      renderWithRouter(<App />, { route });

      const emailText = screen.getByText(/email/i);
      expect(emailText).toBeInTheDocument();
    });
  });

  describe('Testando componentes da página', () => {
    beforeEach(() => {
      localStorage.setItem(STORAGE_KEY, 'cc69f7d69921e3b5');
    });

    afterEach(() => jest.clearAllMocks());

    it('A pagina deve conter um "select" para selecionar uma moeda', async () => {
      renderWithRouter(<App />, { route });

      await waitForElementToBeRemoved(
        screen.queryByText(LOADING),
      );

      const select = screen.getByRole('combobox');

      expect(select).toBeInTheDocument();
    });

    it('Verifica se é possível selecionar a moeda desejada', async () => {
      renderWithRouter(<App />, { route });

      await waitForElementToBeRemoved(
        screen.queryByText(LOADING),
      );

      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();
      expect(select).toHaveValue('BRL');

      fireEvent.change(select, {
        target: { value: 'CAD' },
      });
      expect(select).toHaveValue('CAD');
    });

    it('Veririfica se existe um input para digitar o novo valor', async () => {
      renderWithRouter(<App />, { route });

      await waitForElementToBeRemoved(
        screen.queryByText(LOADING),
      );

      const input = screen.getByTestId(inputId);
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'number');
    });

    it('Veririfica se existe um botão para atualizar o valor', async () => {
      renderWithRouter(<App />, { route });

      await waitForElementToBeRemoved(
        screen.queryByText(LOADING),
      );

      const button = screen.getByRole('button', { name: /atualizar/i });
      expect(button).toBeInTheDocument();
    });

    it('Veririfica se existe um botão voltar', async () => {
      renderWithRouter(<App />, { route });

      await waitForElementToBeRemoved(
        screen.queryByText(LOADING),
      );

      const button = screen.getByRole('button', { name: /voltar/i });
      expect(button).toBeInTheDocument();
    });

    it('Veririfica se é possível atualizar o valor', async () => {
      axios.post.mockReturnValue(mockSendUpdate);

      renderWithRouter(<App />, { route });

      await waitForElementToBeRemoved(
        screen.queryByText(LOADING),
      );

      const input = screen.getByTestId(inputId);
      const button = screen.getByRole('button', { name: /atualizar/i });

      useEvent.type(input, '5');
      useEvent.click(button);

      expect(axios.post).toHaveBeenCalled();
    });

    it('Veririfica se retorna error ao passar valor inválido', async () => {
      axios.post.mockReturnValue(mockErrorUpdate);

      renderWithRouter(<App />, { route });

      await waitForElementToBeRemoved(
        screen.queryByText(LOADING),
      );

      const input = screen.getByTestId(inputId);
      const button = screen.getByRole('button', { name: /atualizar/i });

      useEvent.type(input, '-10');
      useEvent.click(button);

      expect(axios.post).toHaveBeenCalled();
    });

    it('Veririfica se retornar a "/home" quando clica no botão voltar', async () => {
      axios.get.mockReturnValue(quotes);

      renderWithRouter(<App />, { route });

      await waitForElementToBeRemoved(
        screen.queryByText(LOADING),
      );

      const button = screen.getByRole('button', { name: /voltar/i });
      expect(button).toBeInTheDocument();

      useEvent.click(button);

      expect(axios.get).toHaveBeenCalled();
    });
  });
});
