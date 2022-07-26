import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import useFavoriteButton from '../hooks/useFavoriteButton';
import useInProgressStorage from '../hooks/useInProgressStorage';
import useCopyToClipBoard from '../hooks/useCopyToClipboard';
import ReceitasContext from '../hooks/ReceitasContext';
import useInProgressInfo from '../hooks/useInProgressInfo';
import useActualPath from '../hooks/useActualPath';
import useTotalIngredients from '../hooks/useTotalIngredients';
import useStoreDoneRecipes from '../hooks/useStoreDoneRecipes';

function RecipeInProgress() {
  const { recipesData: { recipeInDetail } } = useContext(ReceitasContext);
  const [checkedItens, setCheckedItems] = useState([]);
  const [isLinkInClipBoard, setLinkInClipBoard] = useState(false);
  const [thereIngredientsToCheck, setThereIngredientsToCheck] = useState(true);
  const [isFavorite, setFavorite] = useState();
  const actualPath = useActualPath();
  const { toggleClipboardMessage } = useCopyToClipBoard(isLinkInClipBoard);
  const { getFavoriteButton } = useFavoriteButton();
  const { storeDoneRecipes } = useStoreDoneRecipes();
  const totalIngredient = useTotalIngredients();
  const history = useHistory();
  useInProgressStorage(checkedItens, setCheckedItems, setFavorite);
  useInProgressInfo();

  const createItemProfile = () => {
    if (actualPath.includes('foods')) {
      const itemProfile = {
        thumb: recipeInDetail.strMealThumb,
        title: recipeInDetail.strMeal,
        category: recipeInDetail.strCategory,
        instructions: recipeInDetail.strInstructions,
      };
      return itemProfile;
    }
    if (actualPath.includes('drinks')) {
      const itemProfile = {
        thumb: recipeInDetail.strDrinkThumb,
        title: recipeInDetail.strDrink,
        category: recipeInDetail.strAlcoholic,
        instructions: recipeInDetail.strInstructions,
      };
      return itemProfile;
    }
  };

  useEffect(() => {
    const test = totalIngredient - checkedItens.length;
    return setThereIngredientsToCheck(test > 0);
  }, [checkedItens, totalIngredient]);

  const finalizeRecipe = () => {
    storeDoneRecipes();
    history.push('/done-recipes');
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

  const getStyle = (ingredient, index) => {
    const style = {
      textDecoration: 'line-through',
    };
    if (checkedItens.includes(`${ingredient}_${index}`)) {
      return style;
    }
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

  function getArrayOfIngredients() {
    const allKeys = Object
      .keys(recipeInDetail)
      .filter((item) => item.includes('strIngredient'))
      .map((item) => recipeInDetail[item])
      .filter((item) => item !== '' && item !== null);
    return allKeys;
  }

  function getIngredients() {
    const ingredients = getArrayOfIngredients();
    return ingredients.map((ingredient, index) => (
      <li
        data-testid={ `${index}-ingredient-step` }
        key={ `${ingredient}_${index}` }
        style={ getStyle(ingredient, index) }
      >
        <label htmlFor={ `ingredient_${index}` }>
          <input
            type="checkbox"
            id={ `ingredient_${index}` }
            name={ `${ingredient}_${index}` }
            onChange={ handleChange }
            checked={ (checkedItens.includes(`${ingredient}_${index}`)) }
          />
          {ingredient}
        </label>
      </li>
    ));
  }

  const renderProfile = () => {
    const itemProfile = createItemProfile();
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
        { getFavoriteButton(isFavorite, setFavorite) }
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
          onClick={ finalizeRecipe }
        >
          Finalizar
        </button>
      </>
    );
  };

  return (
    <main>
      { renderProfile() }
    </main>
  );
}

export default RecipeInProgress;
