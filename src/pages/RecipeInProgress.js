import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import ReceitasContext from '../hooks/ReceitasContext';
import useActualPath from '../hooks/useActualPath';
import useDetails from '../hooks/useDetails';

const INITIAL_PROGRESS_DATA = {
  recipeId: '',
  checkedItens: '',
};

function RecipeInProgress() {
  const [inProgressData, setInProgressData] = useState(INITIAL_PROGRESS_DATA);
  const [checkedItens, setCheckedItems] = useState([]);
  const actualPath = useActualPath();
  useDetails(actualPath);
  const match = useRouteMatch();
  const { params: { id } } = match;
  const { recipesData: { recipeInDetail } } = useContext(ReceitasContext);

  useEffect(() => {
    setInProgressData({
      recipeId: id,
      checkedItens,
    });
  }, [checkedItens, id]);

  useEffect(() => {
    // const storageTest = localStorage.getItem('inProgressRecipes');
    const inProgress = localStorage.getItem('inProgressRecipes');
    if (inProgress === null) {
      const initialProgress = JSON.stringify([]);
      return localStorage.setItem('inProgressRecipes', initialProgress);
    }
    const loadCheckedItens = JSON.parse(inProgress);
    if (loadCheckedItens.find((item) => item.recipeId === id)) {
      const index = loadCheckedItens.findIndex((item) => item.recipeId === id);
      const itensChecked = loadCheckedItens[index].checkedItens;
      return setCheckedItems(itensChecked);
    }
  }, [id]);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storageData.find((data) => data.recipeId === id)) {
      const removeData = storageData.filter((data) => data.recipeId !== id);
      const localData = { ...inProgressData };
      const refreshStorageData = [...removeData, localData];
      const stringData = JSON.stringify(refreshStorageData);
      return localStorage.setItem('inProgressRecipes', stringData);
    }
    const localData = { ...inProgressData };
    const refreshStorageData = [...storageData, localData];
    const stringData = JSON.stringify(refreshStorageData);
    return localStorage.setItem('inProgressRecipes', stringData);
  }, [id, inProgressData]);

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
