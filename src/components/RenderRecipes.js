import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ReceitasContext from '../hooks/ReceitasContext';
import useNumberOfCards from '../hooks/useNumberOfCards';

function RenderRecipes() {
  const history = useHistory();
  const actualPath = history.location.pathname;
  const { recipesData, categoriesFoods, categoriesDrinks } = useContext(ReceitasContext);
  const numberOfCards = useNumberOfCards();

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
      if (recipes.length === 1) {
        const { idMeal: id } = recipes[0];
        return history.push(`/foods/${id}`);
      }
      return renderCards(recipes, recipeName, thumb);
    }

    if (recipesKind === 'drinks') {
      const recipes = [...recipesData.drinksData].slice(0, numberOfCards);
      const thumb = 'strDrinkThumb';
      const recipeName = 'strDrink';
      console.log(recipes);
      if (recipes.length === 1) {
        const { idDrink: id } = recipes[0];
        return history.push(`/drinks/${id}`);
      }
      return renderCards(recipes, recipeName, thumb);
    }
  };

  const categoriesBtn = (array) => array.map((category, index) => (
    <button
      type="button"
      key={ `${category.strCategory}_${index}` }
      data-testid={ `${category.strCategory}-category-filter` }
    >
      {category.strCategory}
    </button>
  ));

  return (
    <div className="cardGrid">
      {
        actualPath === '/foods'
          ? categoriesBtn(categoriesFoods)
          : categoriesBtn(categoriesDrinks)
      }

      {
        (actualPath === '/foods')
          ? getRecipesCards('food')
          : getRecipesCards('drinks')
      }
    </div>
  );
}

export default RenderRecipes;
