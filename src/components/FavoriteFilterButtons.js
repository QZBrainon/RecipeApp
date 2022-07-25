import React, { useState, useEffect, useContext } from 'react';
import ReceitasContext from '../hooks/ReceitasContext';

function FavoriteFilterButtons() {
  const { setFavRecipes } = useContext(ReceitasContext);
  const [originalData, setOriginalData] = useState([]);
  const [activeFilter, setFilter] = useState('all');

  useEffect(() => {
    const getFavRecipes = localStorage.getItem('favoriteRecipes');
    if (getFavRecipes) {
      const recipesList = JSON.parse(getFavRecipes);
      setOriginalData(recipesList);
    }
  }, []);

  useEffect(() => {
    if (originalData !== undefined) {
      if (activeFilter === 'all') {
        return setFavRecipes(originalData);
      }
      const teste = originalData.filter((recipe) => recipe.type === activeFilter);
      return setFavRecipes(teste);
    }
  }, [activeFilter, originalData, setFavRecipes]);

  const applyFilter = ({ target: { name } }) => {
    setFilter(name);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        name="all"
        onClick={ applyFilter }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        name="food"
        onClick={ applyFilter }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        name="drink"
        onClick={ applyFilter }
      >
        Drinks
      </button>
    </div>
  );
}

export default FavoriteFilterButtons;
