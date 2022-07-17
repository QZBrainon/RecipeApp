import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recipes from '../pages/Recipes';
import renderWithRouter from './renderWithRouter';
import { checkPropTypes } from 'prop-types';

describe('Testes do componente Search Bar', () => {
  it('1. Verifica se é possível acessar os elementos da barra de busca.', () => {
    const { history } = renderWithRouter(<Recipes />);
    history.push('/foods');

    const searchBtn = screen.getByRole('button', { name: 'img-search'});
    userEvent.click(searchBtn);

    const searchBar = screen.getByRole('textbox', { name: ''});
    userEvent.type(searchBar, 'teste');

    const radioButtons = screen.getAllByRole('radio');
    const radioIngredient = radioButtons[0];
    const radioName = radioButtons[1];
    const radioFstLetter = radioButtons[2];

    expect(radioIngredient).toBeChecked();

    userEvent.click(radioName);
    userEvent.click(radioFstLetter);

  });
})