import React from 'react';
import {  screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeDetails from '../pages/RecipeDetails';
import Recipes from '../pages/Recipes';
import renderWithRouter from './renderWithRouter';
import getMock from './mocks/mock_function';

describe('Teste da Tela RecipeDetails', () => {
    beforeEach(() => {
        
        getMock();
        const { history } = renderWithRouter(<RecipeDetails/>);
        
        history.push('/foods/52804');
        const cardPotine = screen.findByTestId('5-card-name');
        userEvent.click(cardPotine);
        
    });

    it('01. se aparece os elementos da receita na tela',  async () =>{
        const headerText = screen.getByTestId('recipe-title');
        const photoRecipe = screen.getByTestId('recipe-photo');
        const categoryRecipe = screen.getByTestId('recipe-category');
        const instructionsRecipe = screen.getByTestId('instructions');
        const video = screen.getByTestId('video');

        await history.push('/foods/52804');

        expect(headerText).toBeInTheDocument();
        expect(photoRecipe).toBeInTheDocument();
        expect(categoryRecipe).toBeInTheDocument();
        expect(instructionsRecipe).toBeInTheDocument();
        expect(video).toBeInTheDocument();

        const arrayOfIngredients = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19']

        arrayOfIngredients.forEach((numb) => {
            const pIngredients = screen.getByTestId(`${numb}-ingredient-name-and-measure`)
            expect(pIngredients).toHaveLength(19);
        })
    });

});