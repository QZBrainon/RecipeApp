// doc: https://stackoverflow.com/questions/53611098/how-can-i-mock-the-window-alert-method-in-jest
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
import { handleClick } from '../components/SearchBar';

describe('Testes da SearchBar', () => {
    beforeEach(() => {
        getMock();
        const { history } = renderWithRouter(<Recipes />);
        history.push('/drinks');
        
        const clikBtn = screen.getByTestId('search-top-btn');
        userEvent.click(clikBtn);
      });

      it('01. se aparece os inputs na tela', () => {
         const btnInputTexto = screen.getByTestId('search-input');
         const btnSearch = screen.getByTestId('exec-search-btn');
         const btnIngredients = screen.getByTestId('ingredient-search-radio');
         const btnName = screen.getByTestId('name-search-radio');
         const btnFirstLetter = screen.getByTestId('first-letter-search-radio');

         

         expect(btnInputTexto).toBeInTheDocument();
         expect(btnSearch).toBeInTheDocument();
         expect(btnIngredients).toBeInTheDocument();
         expect(btnName).toBeInTheDocument();
         expect(btnFirstLetter).toBeInTheDocument();
      });

     it('02. se ao clicar no botão "Search" com o filtro "First letter" renderiza um alert', () => {
        const searchBtn = screen.getByTestId('exec-search-btn');
        const input = screen.getByTestId('search-input');
        const btnFirstLetter = screen.getByTestId('first-letter-search-radio');
        userEvent.type(input, 'sd')
        userEvent.click(btnFirstLetter);
        userEvent.click(searchBtn);

        jest.spyOn(window, 'alert').mockImplementation(() => {});
        // expect(global.alert).toHaveBeenCalledTimes(1);
        
     });

     it('03. se ao fazer uma busca por "pineapple" aparece os cards na tela', () => {
        const searchBtn = screen.getByTestId('exec-search-btn');
        const input = screen.getByTestId('search-input');
        const btnIngredients = screen.getByTestId('ingredient-search-radio');

        const cardOne = screen.getByTestId('0-card-img');
        const cardTwo = screen.getByTestId('1-card-img');
        const cardThree = screen.getByTestId('2-card-img');
        const cardFour = screen.getByTestId('3-card-img');

        userEvent.type(input, 'pineapple')
        userEvent.click(btnIngredients);
        userEvent.click(searchBtn);

        expect(cardOne).toBeInTheDocument();
        expect(cardTwo).toBeInTheDocument();
        expect(cardThree).toBeInTheDocument();
        expect(cardFour).toBeInTheDocument();
     });

    it('04. se ao digitar "y" renderiza os cards', () => {

     const searchBtn = screen.getByTestId('exec-search-btn');
      const input = screen.getByTestId('search-input');
      const btnFirstLetter = screen.getByTestId('first-letter-search-radio');
        
      userEvent.type(input, 'y')
      userEvent.click(btnFirstLetter);
      userEvent.click(searchBtn);

      const cardOne = screen.getByTestId('0-card-img');
      const cardTwo = screen.getByTestId('1-card-img');

     expect(cardOne).toBeInTheDocument();
     expect(cardTwo).toBeInTheDocument();

    }); 
     
});