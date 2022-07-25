import React, { useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ReceitasContext from './ReceitasContext';
import useActualPath from './useActualPath';

function useFavoriteButton() {
  const { recipesData: { recipeInDetail,
    favoriteRecipes }, setFavRecipes } = useContext(ReceitasContext);
  const { params: { id } } = useRouteMatch();
  const actualPath = useActualPath();

  function sackStorageFavorite() {
    const favItens = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavItens = [...favItens];
    const index = favItens.findIndex((item) => item.id === id);
    newFavItens.splice(index, 1);
    const refreshFavItens = JSON.stringify(newFavItens);
    localStorage.setItem('favoriteRecipes', refreshFavItens);
  }

  function setStorageFavorite(localPath) {
    let favRecipe = {};
    if (localPath.includes('foods')) {
      favRecipe = {
        id: recipeInDetail.idMeal,
        type: 'food',
        nationality: recipeInDetail.strArea,
        category: recipeInDetail.strCategory,
        alcoholicOrNot: '',
        name: recipeInDetail.strMeal,
        image: recipeInDetail.strMealThumb,
      };
    }
    if (localPath.includes('drinks')) {
      favRecipe = {
        id: recipeInDetail.idDrink,
        type: 'drink',
        nationality: '',
        category: recipeInDetail.strCategory,
        alcoholicOrNot: recipeInDetail.strAlcoholic,
        name: recipeInDetail.strDrink,
        image: recipeInDetail.strDrinkThumb,
      };
    }
    const favItens = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isFavRecipeOnStorage = favItens.filter((item) => item.id === favRecipe.id);
    if (!isFavRecipeOnStorage.length) {
      const newFavItens = JSON.stringify([...favItens, favRecipe]);
      localStorage.setItem('favoriteRecipes', newFavItens);
    }
  }

  const toggleFavorite = (isFavorite, setFavorite) => {
    if (isFavorite !== true) {
      setStorageFavorite(actualPath);
      setFavorite(true);
    }
    if (isFavorite === true) {
      sackStorageFavorite();
      setFavorite(false);
    }
  };

  function getFavoriteButton(isFavorite, setFavorite) {
    return (
      (isFavorite)
        ? (
          <button
            type="button"
            onClick={ () => toggleFavorite(isFavorite, setFavorite) }
          >
            <img
              src={ blackHeartIcon }
              data-testid="favorite-btn"
              alt="favorite icon"
            />
          </button>
        )
        : (
          <button
            type="button"
            onClick={ () => toggleFavorite(isFavorite, setFavorite) }
          >
            <img
              src={ whiteHeartIcon }
              data-testid="favorite-btn"
              alt="non-favorite icon"
            />
          </button>
        )
    );
  }

  function deleteFavIten(favId) {
    const newFavData = favoriteRecipes.filter((fav) => fav.id !== favId);
    const newStorageData = JSON.stringify([...newFavData]);
    setFavRecipes(newFavData);
    localStorage.setItem('favoriteRecipes', newStorageData);
  }

  function getFavButton(favId, index) {
    return (
      <button
        type="button"
        onClick={ () => deleteFavIten(favId) }
      >
        <img
          src={ blackHeartIcon }
          data-testid={ `${index}-horizontal-favorite-btn` }
          alt="favorite icon"
        />
      </button>
    );
  }

  const useFavoriteButtonData = {
    setStorageFavorite,
    getFavoriteButton,
    sackStorageFavorite,
    getFavButton };

  return useFavoriteButtonData;
}

export default useFavoriteButton;
