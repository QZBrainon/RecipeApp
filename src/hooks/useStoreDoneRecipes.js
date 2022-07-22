import { useContext } from 'react';
import ReceitasContext from './ReceitasContext';
import useActualPath from './useActualPath';

function useStoreDoneRecipes() {
  const { recipesData: { recipeInDetail } } = useContext(ReceitasContext);
  const actualPath = useActualPath();
  const date = new Date();

  function getMealProfile() {
    const profileRecipe = {
      date,
      type: 'food',
      id: recipeInDetail.idMeal,
      image: recipeInDetail.strMealThumb,
      name: recipeInDetail.strMeal,
      category: recipeInDetail.strCategory,
      alcoholic: '',
      nationality: recipeInDetail.strArea,
      tags: recipeInDetail.strTags,
    };
    return profileRecipe;
  }

  function getDrinkProfile() {
    const profileRecipe = {
      date,
      type: 'drink',
      id: recipeInDetail.idDrink,
      image: recipeInDetail.strDrinkThumb,
      name: recipeInDetail.strDrink,
      category: recipeInDetail.strCategory,
      alcoholic: recipeInDetail.strAlcoholic,
      nationality: '',
      tags: '',
    };
    return profileRecipe;
  }

  function getStored(profile) {
    const doneRecipes = localStorage.getItem('doneRecipes');
    if (!doneRecipes) {
      const doneRecipe = JSON.stringify([profile]);
      console.log(doneRecipe);
      return localStorage.setItem('doneRecipes', doneRecipe);
    }
    const finishedRecipes = JSON.parse(doneRecipes);
    if (!(finishedRecipes.some((item) => item.id === profile.id))) {
      const actualList = [...finishedRecipes, profile];
      const doneActual = JSON.stringify(actualList);
      return localStorage.setItem('doneRecipes', doneActual);
    }
  }

  function storeDoneRecipes() {
    if (actualPath.includes('foods')) {
      const profileRecipe = getMealProfile();
      getStored(profileRecipe);
    }
    if (actualPath.includes('drinks')) {
      const profileRecipe = getDrinkProfile();
      getStored(profileRecipe);
    }
  }

  const useStoreDoneRecipesData = { storeDoneRecipes };

  return useStoreDoneRecipesData;
}

export default useStoreDoneRecipes;
