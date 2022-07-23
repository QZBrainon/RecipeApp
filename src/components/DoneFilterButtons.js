import React, { useContext, useEffect, useState } from 'react';
import ReceitasContext from '../hooks/ReceitasContext';

function DoneFilterButtons() {
  const { setDoneRecipes, recipesData: { doneRecipes } } = useContext(ReceitasContext);
  const [originalData, setOriginalData] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const getDoneRecipes = localStorage.getItem('doneRecipes');
    if (getDoneRecipes) {
      const recipesList = JSON.parse(getDoneRecipes);
      setOriginalData(recipesList);
    }
  }, []);

  useEffect(() => {
    setDoneRecipes(filteredData);
  }, [filteredData, setDoneRecipes]);

  useEffect(() => {
    if (doneRecipes !== undefined) {
      if (activeFilter === 'all') {
        return setFilteredData(originalData);
      }
      const teste = doneRecipes.filter((recipe) => recipe.type === activeFilter);
      return setFilteredData(teste);
    }
  }, [activeFilter, doneRecipes, originalData, setDoneRecipes]);

  const applyFilter = ({ target: { name } }) => {
    setActiveFilter(name);
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

export default DoneFilterButtons;
