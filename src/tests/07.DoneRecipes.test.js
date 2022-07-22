import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
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

    it('01. se renderiza as os pratos finalizados' , () => {
        const { history }=renderWithRouter(<RecipeInProgress/>);
        
        // const img = screen.getByTestId('0-horizontal-image');
        // const textRecipe = screen.getByTestId('0-horizontal-top-text')
        // const nameRecipe = screen.getByTestId('0-horizontal-name');
        // const data = screen.getByTestId('0-horizontal-done-date');
        // const btnShare = screen.getByTestId('0-horizontal-share-btn');
    });

});