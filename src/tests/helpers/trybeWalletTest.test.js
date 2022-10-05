import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './renderWith';
import mockData from './mockData';
import App from '../../App';
import Wallet from '../../pages/Wallet';

const initialState = {
  user: {
    email: 'alguem@email.com',
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
    ],
    expenses: [{
      id: 0,
      value: '13',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '13',
      exchangeRates: mockData,
    }],
    editor: false,
    idToEdit: 0,
  },
};

describe('Tests login page', () => {
  it('Tests the components of login page', () => {
    renderWithRouterAndRedux(<App />);
    const passwordInput = screen.getByTestId('password-input');
    const emailInput = screen.getByTestId('email-input');
    const loginBtn = screen.getByRole('button', { name: /entrar/i });
    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });

  it('Tests the login sistem', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const passwordInput = screen.getByTestId('password-input');
    const emailInput = screen.getByTestId('email-input');
    const loginBtn = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(emailInput, 'alguem@email.com');
    userEvent.type(passwordInput, 'aaaaaa');
    userEvent.click(loginBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });
});

describe('Tests the components of wallet page', () => {
  it('Tests the components of wallet page', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });
    const totalField = screen.getByTestId('total-field');
    const inputValue = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(inputValue).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(totalField).toBeInTheDocument();
  });
});

describe('Tests the table component', () => {
  it('Tests the table component', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });
    const inputValue = screen.getByTestId('value-input');
    const valueContent = screen.getByRole('cell', { name: /13\.00/i });
    const deleteBtn = screen.getByRole('button', { name: /remover/i });
    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(valueContent).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();

    userEvent.click(deleteBtn);
    expect(valueContent).not.toBeInTheDocument();

    userEvent.type(inputValue, '13');
    userEvent.click(addButton);
    const newValueContent = await screen.findByText(/13\.00/i);
    expect(newValueContent).toBeInTheDocument();
  });
});
