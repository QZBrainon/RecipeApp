import { useContext } from 'react';
import ReceitasContext from './ReceitasContext';
import useActualPath from './useActualPath';

function useStoreDoneRecipes() {
  const { recipesData: { recipeInDetail } } = useContext(ReceitasContext);
  const actualPath = useActualPath();

  const getDate = () => {
    const d = new Date();
    const date = d.getDate().toString();
    let month = d.getMonth().toString();
    const year = d.getFullYear().toString();

    if (month.length === 1) {
      const zero = '0';
      month = zero.concat(month);
    }

    console.log(`${date}/${month}/${year}`);
    return (`${date}/${month}/${year}`);
  };

  const getTagArray = (tags) => {
    if (tags) {
      const tagArray = tags.split(',');
      return tagArray;
    }
    return [];
  };

  function getMealProfile() {
    const tagArray = getTagArray(recipeInDetail.strTags);
    const date = getDate();
    const profileRecipe = {
      id: recipeInDetail.idMeal,
      type: 'food',
      nationality: recipeInDetail.strArea,
      category: recipeInDetail.strCategory,
      alcoholicOrNot: '',
      name: recipeInDetail.strMeal,
      image: recipeInDetail.strMealThumb,
      doneDate: date,
      tags: tagArray,
    };
    console.log(profileRecipe);
    return profileRecipe;
  }

  function getDrinkProfile() {
    const tagArray = getTagArray(recipeInDetail.strTags);
    const date = getDate();
    const profileRecipe = {
      id: recipeInDetail.idDrink,
      nationality: '',
      type: 'drink',
      category: recipeInDetail.strCategory,
      alcoholicOrNot: recipeInDetail.strAlcoholic,
      name: recipeInDetail.strDrink,
      image: recipeInDetail.strDrinkThumb,
      doneDate: date,
      tags: tagArray,
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
