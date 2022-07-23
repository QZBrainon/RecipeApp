import React, { useState, useEffect, useContext } from 'react';
import ReceitasContext from '../hooks/ReceitasContext';

function FavoriteFilterButtons() {
  const { setFavRecipes } = useContext(ReceitasContext);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    const getFavRecipes = localStorage.getItem('favoriteRecipes');
    if (getFavRecipes) {
      const recipesList = JSON.parse(getFavRecipes);
      setOriginalData(recipesList);
    }
  }, []);

  useEffect(() => {
    if (originalData !== undefined) {
      return setFavRecipes(originalData);
      // if (activeFilter === 'all') {
      //   return setFavRecipes(originalData);
      // }
      // const teste = originalData.filter((recipe) => recipe.type === activeFilter);
      // return setFavRecipes(teste);
    }
  }, [originalData, setFavRecipes]);

  return (
    <div>
      <button type="button" data-testid="filter-by-all-btn">
        All
      </button>
      <button type="button" data-testid="filter-by-food-btn">
        Food
      </button>
      <button type="button" data-testid="filter-by-drink-btn">
        Drinks
      </button>
    </div>
  );
}

export default FavoriteFilterButtons;
