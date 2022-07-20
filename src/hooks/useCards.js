import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function useCards() {
  const history = useHistory();
  const actualPath = history.location.pathname;

  const getId = (recipe) => {
    if (actualPath === '/foods') {
      const { idMeal } = recipe;
      return `/foods/${idMeal}`;
    }
    if (actualPath === '/drinks') {
      const { idDrink } = recipe;
      return `/drinks/${idDrink}`;
    }
  };

  function renderCards(recipes, recipeName, thumb) {
    return recipes.map((recipe, index) => {
      const id = getId(recipe);
      return (
        <Link to={ id } key={ `${recipe}_${index}` } className="linkCard">
          <article
            data-testid={ `${index}-recipe-card` }
            className="recipeCard"
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe[thumb] }
              alt={ `thumb of ${recipe[recipeName]}` }
            />
            <h3 data-testid={ `${index}-card-name` }>{recipe[recipeName]}</h3>
          </article>
        </Link>
      );
    });
  }

  const useCardsData = { renderCards };

  return useCardsData;
}

export default useCards;
