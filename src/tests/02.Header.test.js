import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recipes from '../pages/Recipes';
import renderWithRouter from '../renderWithRouter';


describe(' Testes Header', () => {
  
  it('01. Testa se o botão de busca exibe e esconde a barra de busca', () => {

    const { history } = renderWithRouter(<Recipes />);
    history.push('/foods');

    const searchBtn = screen.getByRole('button', {name: 'img-search'});

    userEvent.click(searchBtn);
    const searchBar = screen.getByRole('textbox');
    expect(searchBar).toBeInTheDocument();
    
    userEvent.click(searchBtn);
    expect(searchBar).not.toBeInTheDocument();
  });
  
  it('02. Testa se ao clicar no botão profile, acessamos a página profile', () => {
    const { history } = renderWithRouter(<Recipes />);
    history.push('/foods');
    
    const profileBtn = screen.getByRole('button', {name: 'img-profile'});
    userEvent.click(profileBtn);
    
    expect(history.location.pathname).toBe('/profile');
    const profileTitle = screen.getByText(/profile/i);
    expect(profileTitle).toBeInTheDocument();
  })

});