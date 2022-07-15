import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recipes from '../pages/Recipes';
import renderWithRouter from '../renderWithRouter';

describe(' Testes Header', () => {
    beforeEach(() => {
        renderWithRouter(<Recipes />)
    })
    it('aparece os inputs na Tela', () => {
        const imagePerfil = screen.getByTestId('profile-top-btn');
       // const imagemSearch = screen.getByTestId('search-top-btn');
        const textoPagina = screen.getByTestId('page-title');
        const botaoPerfil = screen.getByText(/Perfil/i);
        const botaoBuscar = screen.getByTestId('search-input');

        expect(imagePerfil).toBeInTheDocument();
       // expect(imagemSearch).toBeInTheDocument();
        expect(textoPagina).toBeInTheDocument();
        expect(botaoPerfil).toBeInTheDocument();
        expect(botaoBuscar).toBeInTheDocument();
    });
    it(' se ao clicar no botão "Buscar" aparece os inputs', () => {
        const botaoBuscar = screen.getByTestId('search-input');
        
        userEvent.click(botaoBuscar)

        const botaoIngrediente = screen.getByTestId('ingredient-search-radio');
        const botaoName = screen.getByTestId('name-search-radio');
        const botaoLetra = screen.getByTestId('first-letter-search-radio');
        const botaoSearch = screen.getByTestId('exec-search-btn');

        expect(botaoSearch).toBeInTheDocument();
        expect(botaoIngrediente).toBeInTheDocument();
        expect(botaoName).toBeInTheDocument();
        expect(botaoLetra).toBeInTheDocument();
    });
    it(' se redireciona a Página para "/profile"', () => {
        const botaoPerfil = screen.getByTestId('profile-top-btn');

       // userEvent.click(botaoPerfil)

        history.push('/profile');

        // const title = screen.getByText('Profile');
        
        
        // expect(history.location.pathname).toBe('/profile');
    });
   /* it('se os inputs não aparecem na tela', () => {
        const botaoBuscar = screen.getByTestId('search-input');

        userEvent.click(botaoBuscar)

        const botaoIngrediente = screen.getByTestId('ingredient-search-radio');
        const botaoName = screen.getByTestId('name-search-radio');
        const botaoLetra = screen.getByTestId('first-letter-search-radio');
        const botaoSearch = screen.getByTestId('exec-search-btn');

        expect(botaoSearch).not.toBeInTheDocument();
        expect(botaoIngrediente).not.toBeInTheDocument();
        expect(botaoName).not.toBeInTheDocument();
        expect(botaoLetra).not.toBeInTheDocument();
    }); */
});