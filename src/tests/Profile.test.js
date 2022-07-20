import React from 'react';
import {  screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import renderWithRouter from './renderWithRouter';
import getMock from './mocks/mock_function';

describe('Tela de Profile', () => {

    beforeEach(() => {
        getMock();
        const { history } = renderWithRouter(<Profile/>);
        history.push('/profile');
    });

    it('01. se aparece os inputs na Tela' , () => {
        const header = screen.getByTestId('profile-email');
        const doneRecipesBtn = screen.getByTestId('profile-done-btn');
        const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');
        const logoutBtn = screen.getByTestId('profile-logout-btn');

        expect(header).toBeInTheDocument();
        expect(doneRecipesBtn).toBeInTheDocument();
        expect(favoriteRecipesBtn).toBeInTheDocument();
        expect(favoriteRecipesBtn).toBeInTheDocument();
        expect(logoutBtn).toBeInTheDocument();
    });

    it('02. se aparece o email logado', () => {
        const { history } = renderWithRouter(<Login/>);
        
        const inputEmail = screen.getByTestId('email-input');
        const senhaInput = screen.getByTestId('password-input');
        const btnLogin = screen.getByTestId('login-submit-btn');
        userEvent.type(inputEmail, 'email@email.com')
        userEvent.type(senhaInput, '1234567')
        userEvent.click(btnLogin);

        const btnPerfil = screen.getByTestId('profile-top-btn');

        userEvent.click(btnPerfil);

        const emailText = screen.getByTestId('profile-email')
        expect(emailText).toBeInTheDocument();
    });

    it('03. se redireciona a pagina para "DoneRecipes"', () => {
        const btnDoneRecipes = screen.getByTestId('profile-done-btn');
        userEvent.click(btnDoneRecipes)
        const text = screen.getByRole('heading', {name: /Done Recipes/i});

        expect(text).toBeInTheDocument();      
    });
    it('04. se redireciona a pagina para "FavoriteRecipes"', () => {
        const btnFavRecipes = screen.getByTestId('profile-favorite-btn');
        userEvent.click(btnFavRecipes)
        const text = screen.getByRole('heading', {name: /Favorite Recipes/i});

        expect(text).toBeInTheDocument();      
    });

    it('05. redireciona a pagina para Login', () => {
       
        const btnLogout = screen.getByTestId('profile-logout-btn');
       // const input = screen.getByLabelText('E-mail:');
        
        userEvent.click(btnLogout)
        localStorage.clear();
        // expect(input).toBeInTheDocument();
        
    });

});