import React, { useContext } from 'react';
import ReceitasContext from './ReceitasContext';
import useActualPath from './useActualPath';
import shareIcon from '../images/shareIcon.svg';

function useProgressInfo(checkedItens, setCheckedItems) {
  const { recipesData: { recipeInDetail } } = useContext(ReceitasContext);
  const actualPath = useActualPath();

  const handleChange = ({ target: { name } }) => {
    if (checkedItens.includes(name)) {
      const refreshCheckedItens = [...checkedItens];
      const index = refreshCheckedItens.indexOf(name);
      refreshCheckedItens.splice(index, 1);
      return setCheckedItems(refreshCheckedItens);
    }
    const refreshCheckedItens = [...checkedItens, name];
    return setCheckedItems(refreshCheckedItens);
  };

  const getStyle = (ingredient) => {
    const style = {
      textDecoration: 'line-through',
    };
    if (checkedItens.includes(ingredient)) {
      return style;
    }
  };

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
      <li
        data-testid={ `${index}-ingredient-step` }
        key={ `${ingredient}_${index}` }
        style={ getStyle(ingredient) }
      >
        <input
          type="checkbox"
          name={ ingredient }
          onChange={ handleChange }
          checked={ (checkedItens.includes(ingredient)) }
        />
        {ingredient}
      </li>
    ));
  };

  function renderInfo(itemProfile) {
    const { thumb, title, category, instructions } = itemProfile;
    return (
      <>
        <img
          data-testid="recipe-photo"
          className="imgInProgress"
          src={ thumb }
          alt={ `${title}` }
        />
        <h1 data-testid="recipe-title">
          {title}
        </h1>
        <button type="button" data-testid="share-btn">
          <img src={ shareIcon } alt="compartilhar" />
        </button>
        <button type="button" data-testid="favorite-btn">
          Favoritar
        </button>
        <h4 data-testid="recipe-category">
          Categoria:
          {' '}
          {category}
        </h4>
        <ul>
          { getIngredients() }
        </ul>
        <p data-testid="instructions">{instructions}</p>
        <button type="button" data-testid="finish-recipe-btn">
          Finalizar
        </button>
      </>
    );
  }

  function getProgressInfo() {
    if (actualPath.includes('foods')) {
      const { strMealThumb: thumb, strMeal: title,
        strCategory: category, strInstructions: instructions } = recipeInDetail;
      const itemProfile = {
        thumb,
        title,
        category,
        instructions,
      };
      return renderInfo(itemProfile);
    }
    if (actualPath.includes('drinks')) {
      const { strDrinkThumb: thumb, strDrink: title,
        strAlcoholic: category, strInstructions: instructions } = recipeInDetail;
      const itemProfile = {
        thumb,
        title,
        category,
        instructions,
      };
      return renderInfo(itemProfile);
    }
  }

  const ProgressInfoData = { getProgressInfo };
  return ProgressInfoData;
}

export default useProgressInfo;
