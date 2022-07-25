import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Recipes from '../pages/Recipes';
import DoneRecipes from '../pages/DoneRecipes';

describe('Testa a tela de receitas feitas', () => {

    beforeEach(() => {
        
    });

    it('01. se renderiza a pagina' , () => {
        const { history } = renderWithRouter(<DoneRecipes />);

        const text = screen.getByTestId('page-title');

        expect(text).toBeInTheDocument();
    });

    it('02. se tem os inputs na pag', () => {
        const { history } = renderWithRouter(<DoneRecipes />);
        
        const btnProfile = screen.getByTestId('profile-top-btn');
        const filterAll = screen.getByTestId('filter-by-all-btn');
        const filterFood = screen.getByTestId('filter-by-food-btn');
        const filterDrink = screen.getByTestId('filter-by-drink-btn');
        
        expect(btnProfile).toBeInTheDocument();
        expect(filterAll).toBeInTheDocument();
        expect(filterFood).toBeInTheDocument();
        expect(filterDrink).toBeInTheDocument();
    });

    it('03. se renderiza as os pratos finalizados' , async () => {
        const { history } = renderWithRouter(<App/>);
        history.push('/foods/52977/in-progress')

        const ingredientOne = await screen.findByTestId('0-ingredient-step');
        const ingredientTwo = await screen.findByTestId('1-ingredient-step');
        const ingredientThree = await screen.findByTestId('2-ingredient-step');
        const ingredientFour = await screen.findByTestId('3-ingredient-step');
        const ingredientFive = await screen.findByTestId('4-ingredient-step');
        const ingredientSix = await screen.findByTestId('5-ingredient-step');
        const ingredientSeven = await screen.findByTestId('6-ingredient-step');
        const ingredientEight = await screen.findByTestId('7-ingredient-step');
        const ingredientNine = await screen.findByTestId('8-ingredient-step');
        const ingredientTen = await screen.findByTestId('9-ingredient-step');
        const ingredientEleven = await screen.findByTestId('10-ingredient-step');
        const ingredientTwelve = await screen.findByTestId('11-ingredient-step');
        const ingredientThirteen = await screen.findByTestId('12-ingredient-step');

        userEvent.click(ingredientOne)
        userEvent.click(ingredientTwo)
        userEvent.click(ingredientThree)
        userEvent.click(ingredientFour)
        userEvent.click(ingredientFive)
        userEvent.click(ingredientSix)
        userEvent.click(ingredientSeven)
        userEvent.click(ingredientEight)
        userEvent.click(ingredientNine)
        userEvent.click(ingredientTen)
        userEvent.click(ingredientEleven)
        userEvent.click(ingredientTwelve)
        userEvent.click(ingredientThirteen)

        const btnFinish = await screen.findByTestId('finish-recipe-btn');

        userEvent.click(btnFinish)

        console.log(btnFinish);
       

        const imgRecipe = await screen.findByTestId('0-horizontal-image');
        const textRecipe = await screen.findByTestId('0-horizontal-top-text');
        const nameRecipe = await screen.findByTestId('0-horizontal-name');
        const dataRecipe = await screen.findByTestId('0-horizontal-done-date');
        const tagRecipe = await screen.findByTestId('0-Soup-horizontal-tag');


        expect(imgRecipe).toBeInTheDocument();
        expect(textRecipe).toBeInTheDocument();
        expect(nameRecipe).toBeInTheDocument();
        expect(dataRecipe).toBeInTheDocument();
        expect(tagRecipe).toBeInTheDocument(); 
        
    });

});