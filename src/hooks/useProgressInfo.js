import React, { useContext, useState, useEffect } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import ReceitasContext from './ReceitasContext';
import useActualPath from './useActualPath';
import useCopyToClipBoard from './useCopyToClipboard';
import useFavoriteButton from './useFavoriteButton';
import useTotalIngredients from './useTotalIngredients';

function useProgressInfo(inProgressState) {
  const { checkedItens, setCheckedItems, isFavorite, setFavorite } = inProgressState;
  const [isLinkInClipBoard, setLinkInClipBoard] = useState(false);
  const [thereIngredientsToCheck, setThereIngredientsToCheck] = useState(true);
  const { recipesData: { recipeInDetail } } = useContext(ReceitasContext);
  const { toggleClipboardMessage } = useCopyToClipBoard(isLinkInClipBoard);
  const { getFavoriteButton,
    setStorageFavorite,
    sackStorageFavorite } = useFavoriteButton();
  const actualPath = useActualPath();
  const totalIngredient = useTotalIngredients();
  const history = useHistory();

  useEffect(() => {
    const test = totalIngredient - checkedItens.length;
    return setThereIngredientsToCheck(test > 0);
  }, [checkedItens, totalIngredient]);

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

  const toggleFavorite = () => {
    if (isFavorite !== true) {
      setStorageFavorite(actualPath, setFavorite);
      setFavorite(true);
    }
    if (isFavorite === true) {
      sackStorageFavorite(setFavorite);
      setFavorite(false);
    }
  };

  const getStyle = (ingredient) => {
    const style = {
      textDecoration: 'line-through',
    };
    if (checkedItens.includes(ingredient)) {
      return style;
    }
  };

  const shareClick = () => {
    const url = window.location.href;
    if (url.includes('in-progress')) {
      const newUrl = url.replace('/in-progress', '');
      clipboardCopy(newUrl);
      return setLinkInClipBoard(!isLinkInClipBoard);
    }
    clipboardCopy(url);
    return setLinkInClipBoard(!isLinkInClipBoard);
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
        <button type="button" data-testid="share-btn" onClick={ shareClick }>
          { toggleClipboardMessage() }
        </button>
        <button type="button" data-testid="favorite-btn" onClick={ toggleFavorite }>
          { getFavoriteButton(isFavorite) }
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
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ thereIngredientsToCheck }
          onClick={ () => history.push('/done-recipes') }
        >
          Finalizar
        </button>
      </>
    );
  }

  function getProgressInfo() {
    if (actualPath.includes('foods')) {
      const itemProfile = {
        thumb: recipeInDetail.strMealThumb,
        title: recipeInDetail.strMeal,
        category: recipeInDetail.strCategory,
        instructions: recipeInDetail.strInstructions,
      };
      return renderInfo(itemProfile);
    }
    if (actualPath.includes('drinks')) {
      const itemProfile = {
        thumb: recipeInDetail.strDrinkThumb,
        title: recipeInDetail.strDrink,
        category: recipeInDetail.strAlcoholic,
        instructions: recipeInDetail.strInstructions,
      };
      return renderInfo(itemProfile);
    }
  }

  const ProgressInfoData = { getProgressInfo };
  return ProgressInfoData;
}

export default useProgressInfo;
