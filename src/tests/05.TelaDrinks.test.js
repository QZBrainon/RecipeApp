import React from 'react';
import { getByRole, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recipes from '../pages/Recipes';
import renderWithRouter from './renderWithRouter';
import MOCK_DRINKS_DATA from './mocks/drinks_data';
import MOCK_FOOD_DATA from './mocks/food_data';
import MOCK_DRINKS_CATEGORY from './mocks/drinks_category';
import MOCK_FOOD_CATEGORY from './mocks/food_category';
import { ENDPOINT_CATEGORIES_DRINKS, ENDPOINT_CATEGORIES_FOODS, ENDPOINT_DRINK, ENDPOINT_FOOD } from '../hooks/endpoints';
import getMock from './mocks/mock_function';

describe('Testes da tela geral Drinks', () => {
    beforeEach(() => {
      getMock();
      const { history } = renderWithRouter(<Recipes />);
      history.push('/drinks');
    });
  
    it('1. Verifica se é possível acessar os elementos da barra de busca.', async () => {
      console.log('matar os erros!');

      const teste = await screen.findAllByText('GG');
      screen.debug();
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

    });
  
    it('2. Verifica se são renderizados 12 cards de drinks na tela drinks', async () => {
      const cards = await screen.findAllByRole('article');
      expect(cards).toHaveLength(12);
           
    })
  
    it('3. verifica se os cards são renderizados corretamente', () => {
      const mealsName = ['GG', 'A1', 'ABC', 'Kir', '747', '252', 'Ace', 'Adam', 'B-53', 'AT&T', 'ACID', 'B-52'];

      mealsName.forEach((recipe) => {
        const testMealName = screen.getByRole('heading', { name: recipe });
        expect(testMealName).toBeInTheDocument();
      });
    })
    it('4. verifica se os botões de categorias são renderizados na Tela', () => {
      const categoriesBtn = ['Ordinary Drink', 'Cocktail', 'Shake', 'Other/Unknown', 'Cocoa']
  
      categoriesBtn.forEach((category) => {
        
        const btnCategories = screen.getByTestId(`${category}-category-filter`);
        expect(btnCategories).toBeInTheDocument();
      })
    });
  })