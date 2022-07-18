import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recipes from '../pages/Recipes';
import renderWithRouter from './renderWithRouter';

describe('Testes do componente Footer', () => {

  it('Teste se ao clicar nos botões do Footer, o App navega para as respectivas páginas', () => {
    const { history } = renderWithRouter(<Recipes />);
    history.push('/foods');

    const foodsHeader = screen.getByRole('heading', { level: 1, name: /foods/i });
    expect(foodsHeader).toBeInTheDocument();

    const drinksBtn = screen.getByRole('button', { name: 'drink-icon' });
    userEvent.click(drinksBtn);
    expect(foodsHeader).not.toHaveTextContent(/foods/i);
    expect(foodsHeader).toHaveTextContent(/drinks/i);

   expect(history.location.pathname).toBe('/drinks');

   const foodsBtn = screen.getByRole('button', { name: 'meal-icon' });
   userEvent.click(foodsBtn);
   expect(foodsHeader).not.toHaveTextContent(/drinks/i);
   expect(foodsHeader).toHaveTextContent(/foods/i);

  expect(history.location.pathname).toBe('/foods');
  })
})