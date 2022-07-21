import React, { useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ReceitasContext from './ReceitasContext';

function useFavoriteButton() {
  const { recipesData: { recipeInDetail } } = useContext(ReceitasContext);
  const { params: { id } } = useRouteMatch();

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
        alcooholicOrNot: '',
        name: recipeInDetail.strMeal,
        image: recipeInDetail.strMealThumb,
      };
    }
    if (localPath.includes('drinks')) {
      favRecipe = {
        id: recipeInDetail.idDrink,
        type: 'drink',
        nationality: '',
        category: '',
        alcooholicOrNot: recipeInDetail.strAlcoholic,
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

  function getFavoriteButton(isFavorite) {
    return (
      (isFavorite)
        ? <img src={ blackHeartIcon } alt="favorite icon" />
        : <img src={ whiteHeartIcon } alt="non-favorite icon" />
    );
  }

  const useFavoriteButtonData = {
    setStorageFavorite,
    getFavoriteButton,
    sackStorageFavorite };

  return useFavoriteButtonData;
}

export default useFavoriteButton;
