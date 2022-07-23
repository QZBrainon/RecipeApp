// doc: https://stackoverflow.com/questions/55177928/how-do-you-check-a-checkbox-in-react-testing-library
import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import getMock from './mocks/mock_function';
import renderWithRouter from './renderWithRouter';
import App from '../App';

 /* class LocalStorageMock {
    constructor() {
      this.store = {}
    }
  
    clear() {
      this.store = {}
    }
  
    getItem(key) {
      return this.store[key] || null
    }
  
    setItem(key, value) {
      this.store[key] = value
    }
  
    removeItem(key) {
      delete this.store[key]
    }
  }
  
  global.localStorage = new LocalStorageMock */


describe('Teste da Tela RecipeInProgress', () => {
    beforeEach(() => {
        
         
    });
    
   it('01. se tem os inputs na tela ', async () => {
    const { history } = renderWithRouter(<App/>);
    history.push('/foods/:id/in-progress');

    const imgRecipe = await screen.findByTestId('recipe-photo');
    const textRecipe = await screen.findByTestId('recipe-title');
    const btnShare = await screen.findByTestId('share-btn');
    const btnFav = await screen.findByTestId('favorite-btn');
    const category = await screen.findByTestId('recipe-category');
    const instructions = await screen.findByTestId('instructions');
    const btnFinish = await screen.findByTestId('finish-recipe-btn');

    

    
        expect(imgRecipe).toBeInTheDocument();
        expect(textRecipe).toBeInTheDocument();
        expect(btnShare).toBeInTheDocument();
        expect(btnFav).toBeInTheDocument();
        expect(category).toBeInTheDocument();
        expect(instructions).toBeInTheDocument();
        expect(btnFinish).toBeInTheDocument();
        expect(instructions).toBeInTheDocument();
    });

    it.only('02. se favoritar funciona corretamente', async () => {
        const { history } = renderWithRouter(<App/>);
        history.push('/foods/52977/in-progress');

        const imgNonFav = await screen.findByAltText('non-favorite icon');
        
        expect(imgNonFav).toBeInTheDocument();
        userEvent.click(await screen.findByTestId('favorite-btn'));

        const imgFav = await screen.findByAltText('favorite icon');

        expect(imgFav).toBeInTheDocument();
        
    });

 it('03. se ao clicar no checkbox coloca o "style = text-decoration: line-through"', async () => {
         getMock();

        const { history } = renderWithRouter(<App/>);
        history.push('/foods/52804/in-progress');

        const checkbox = await screen.findAllByRole('checkbox');
        expect(checkbox).toHaveLength(13);
    }); 
});
