import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ReceitasContext from '../hooks/ReceitasContext';
import useNumberOfCards from '../hooks/useNumberOfCards';

function RenderRecipes({ params }) {
  const history = useHistory();
  const actualPath = history.location.pathname;
  const { recipesData } = useContext(ReceitasContext);
  const numberOfCards = useNumberOfCards();
  console.log(params);

  const renderCards = (recipes, recipeName, thumb) => recipes.map((recipe, index) => (
    <article
      key={ `${recipe}_${index}` }
      data-testid={ `${index}-recipe-card` }
      className="recipeCard"
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ recipe[thumb] }
        alt={ `thumb of ${recipe[recipeName]}` }
      />
      <h3 data-testid={ `${index}-card-name` }>{ recipe[recipeName] }</h3>
    </article>
  ));

  const getRecipesCards = (recipesKind) => {
    if (recipesKind === 'food') {
      const recipes = [...recipesData.foodData].slice(0, numberOfCards);
      const thumb = 'strMealThumb';
      const recipeName = 'strMeal';
      return renderCards(recipes, recipeName, thumb);
    }

    if (recipesKind === 'drinks') {
      const recipes = [...recipesData.drinksData].slice(0, numberOfCards);
      const thumb = 'strDrinkThumb';
      const recipeName = 'strDrink';
      return renderCards(recipes, recipeName, thumb);
    }
  };

  return (
    <div className="cardGrid">
      {
        (actualPath === '/foods')
          ? getRecipesCards('food')
          : getRecipesCards('drinks')
      }
    </div>
  );
}

export default RenderRecipes;
