import React from 'react';
import { getByRole, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recipes from '../pages/Recipes';
import renderWithRouter from './renderWithRouter';
import { checkPropTypes } from 'prop-types';
import { act } from 'react-dom/test-utils';
import MOCK_MAIN_DATA from './mocks/food_data';


describe('Testes da tela geral Foods', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(MOCK_MAIN_DATA),
      }));
    const { history } = renderWithRouter(<Recipes />);
    history.push('/foods');
  });

  it('1. Verifica se é possível acessar os elementos da barra de busca.', async () => {
    const searchBtn = screen.getByRole('button', { name: 'img-search'});
    userEvent.click(searchBtn);

    const searchBar = screen.getByRole('textbox', { name: ''});
    userEvent.type(searchBar, 'teste');

    const radioIngredient = screen.getByRole('radio', { name: /ingredient/i });
    const radioName = screen.getByRole('radio', { name: /name/i });
    const radioFstLetter = screen.getByRole('radio', { name: /first letter/i });
    expect(radioIngredient).toBeChecked();

    userEvent.click(radioName);

    userEvent.click(radioFstLetter);
    expect(radioFstLetter).toBeChecked();
    screen.debug();
  });

  it('2. Verifica se são renderizados 12 cards de comida na tela foods', async () => {
    const cards = await screen.findAllByRole('article');
    expect(cards).toHaveLength(12);
  })

  it('3. verifica se os cards são renderizados corretamente', () => {
    const mealsName = ['Corba', 'Burek', 'Kumpir', 'Tamiya', 'Dal fry', 'Poutine', 'Lasagne', 'Timbits', 'Wontons', 'Kafteji', 'Big Mac', 'Koshari'];

    mealsName.forEach((recipe) => {
      const testMealName = screen.getByRole('heading', { name: recipe });
      expect(testMealName).toBeInTheDocument();
    });
  })
});
