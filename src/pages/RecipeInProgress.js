import React, { useContext } from 'react';
import ReceitasContext from '../hooks/ReceitasContext';
import useActualPath from '../hooks/useActualPath';
import useDetails from '../hooks/useDetails';

function RecipeInProgress() {
  const actualPath = useActualPath();
  useDetails(actualPath);
  const { recipesData: { recipeInDetail } } = useContext(ReceitasContext);

  const getIngredientsList = () => {
    const allKeys = Object
      .keys(recipeInDetail)
      .filter((item) => item.includes('strIngredient'))
      .map((item) => recipeInDetail[item])
      .filter((item) => item !== '' && item !== null);
    return allKeys;
  };

  const getIngredients = () => {
    const ingredientsList = getIngredientsList();
    return ingredientsList.map((ingredient, index) => (
      <li data-testid={ `${index}-ingredient-step` } key={ `${ingredient}_${index}` }>
        <input type="checkbox" />
        {ingredient}
      </li>
    ));
  };

  const getProgressInfo = () => {
    if (actualPath.includes('foods')) {
      return (
        <>
          <img
            data-testid="recipe-photo"
            className="imgInProgress"
            src={ recipeInDetail.strMealThumb }
            alt={ `${recipeInDetail.strMeal}` }
          />
          <h1 data-testid="recipe-title">
            {recipeInDetail.strMeal}
          </h1>
          <button type="button" data-testid="share-btn">
            Compartilhar
          </button>
          <button type="button" data-testid="favorite-btn">
            Favoritar
          </button>
          <h4 data-testid="recipe-category">
            Categoria:
            {' '}
            {recipeInDetail.strCategory}
          </h4>
          <ul>
            { getIngredients() }
          </ul>
          <p data-testid="instructions">{recipeInDetail.strInstructions}</p>
          <button type="button" data-testid="finish-recipe-btn">
            Finalizar
          </button>
        </>
      );
    }

    if (actualPath.includes('drinks')) {
      return (
        <>
          <img
            data-testid="recipe-photo"
            className="imgInProgress"
            src={ recipeInDetail.strDrinkThumb }
            alt={ `${recipeInDetail.strDrink}` }
          />
          <h1 data-testid="recipe-title">
            {recipeInDetail.strDrink}
          </h1>
          <button type="button" data-testid="share-btn">
            Compartilhar
          </button>
          <button type="button" data-testid="favorite-btn">
            Favoritar
          </button>
          <h4 data-testid="recipe-category">
            Categoria:
            {' '}
            {recipeInDetail.strAlcoholic}
          </h4>
          <ul>
            { getIngredients() }
          </ul>
          <p data-testid="instructions">{recipeInDetail.strInstructions}</p>
          <button type="button" data-testid="finish-recipe-btn">
            Finalizar
          </button>
        </>
      );
    }
  };

  return (
    <main>
      { getProgressInfo() }
    </main>
  );
}

export default RecipeInProgress;
