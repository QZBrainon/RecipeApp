import React from 'react';
import {  screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste da Tela RecipeDetails', () => {
    beforeEach(() => {
       // getMock();
        const { history } = renderWithRouter(<App/>);
        history.push('/foods');
    });

    it('01. se aparece os elementos da receita na tela', async () => {
        
        userEvent.click(await screen.findByTestId('0-card-img'))
        

       const headerText = await screen.findByTestId('recipe-title');
        const photoRecipe = await screen.findByTestId('recipe-photo');
        const categoryRecipe = await screen.findByTestId('recipe-category');
        const instructionsRecipe = await screen.findByTestId('instructions');
        const video = await screen.findByTestId('video');

        expect(headerText).toBeInTheDocument();
        expect(photoRecipe).toBeInTheDocument();
        expect(categoryRecipe).toBeInTheDocument();
        expect(instructionsRecipe).toBeInTheDocument();
        expect(video).toBeInTheDocument();

   });

    it('02. se aparece os cards recomendados', async () => {

     userEvent.click(await screen.findByTestId('0-card-img'));

      const arrayNumb = ['0', '1', '2', '3', '4',
         '5', '6', '7', '8', '9', '10', '11', '12', 
         '13', '14', '15', '16', '17', '18', '19','20',
          '21', '22', '23', '24'
        ];
    
        const arrayNames = ['GG','A1', 'ABC', 'Kir', '747', '252','Ace',
        'Adam', 'B-53', 'AT&T', 'ACID',  'B-52', 'H.D.', 'Smut','Rose',
         'A.J.','Derby', 'Karsk', 'Melya', '50/50', 'Zorro', 'Bijou', 'Affair', 'Boxcar', 'Orgasm'
        ];
    
      arrayNumb.forEach(async (numb)  => {
            const recomendationCard = await screen.findByTestId(`${numb}-recomendation-card`);
            expect(recomendationCard).toBeInTheDocument();
        });

        arrayNames.forEach(async (names) => {
            const nameRecomendation = await screen.findByRole('paragraph', { name: `${names}`});
            expect(nameRecomendation).toBeInTheDocument();
        });
    });

});