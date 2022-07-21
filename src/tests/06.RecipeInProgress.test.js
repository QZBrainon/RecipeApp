import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen} from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste da Tela RecipeInProgress', () => {
    beforeEach(() => {
         const { history } = renderWithRouter(<App/>);
         history.push('/foods/:id/in-progress');
    });
    
    it('01. se tem os inputs na tela ', async () => {
    const imgRecipe = await screen.findByTestId('recipe-photo');
    const textRecipe = await screen.findByTestId('recipe-title');
    const btnShare = await screen.findByTestId('share-btn');
    const btnFav = await screen.findByTestId('favorite-btn');
    const category = await screen.findByTestId('recipe-category');
    const instructions = await screen.findByTestId('instructions');
    const btnFinish = await screen.findByTestId('finish-recipe-btn');

        const arrayIngredients = ['0','1','2','3','4','5','6','7','8','9','10','11','12'];

        arrayIngredients.forEach( async (num) => {
            
            const listItem = await screen.findByTestId(`${num}-ingredient-step`);
            expect(listItem).toBeInTheDocument();
        });

        expect(imgRecipe).toBeInTheDocument();
        expect(textRecipe).toBeInTheDocument();
        expect(btnShare).toBeInTheDocument();
        expect(btnFav).toBeInTheDocument();
        expect(category).toBeInTheDocument();
        expect(instructions).toBeInTheDocument();
        expect(btnFinish).toBeInTheDocument();
        expect(instructions).toBeInTheDocument();
    });

    it('02. se favoritar funciona corretamente', async () => {
        
        const imgNonFav = await screen.findByAltText('non-favorite icon');
        
        userEvent.click(await screen.findByTestId('favorite-btn'));

        const imgFav = await screen.findByAltText('favorite icon');

        expect(imgFav).toBeInTheDocument();
    });

    it('03. se ao clicar no checkbox coloca o "style = text-decoration: line-through"', async () => {
        const checkbox = await screen.findByRole('checkbox', {checked:false });

        expect(checkbox).toBe('false');
    }); 
});
