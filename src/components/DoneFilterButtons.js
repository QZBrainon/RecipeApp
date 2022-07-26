import React, { useContext, useEffect, useState } from 'react';
import ReceitasContext from '../hooks/ReceitasContext';

function DoneFilterButtons() {
  const { setDoneRecipes } = useContext(ReceitasContext);
  const [originalData, setOriginalData] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const getDoneRecipes = localStorage.getItem('doneRecipes');
    if (getDoneRecipes) {
      const recipesList = JSON.parse(getDoneRecipes);
      setOriginalData(recipesList);
    }
  }, []);

  useEffect(() => {
    if (originalData !== undefined) {
      if (activeFilter === 'all') {
        return setDoneRecipes(originalData);
      }
      const teste = originalData.filter((recipe) => recipe.type === activeFilter);
      return setDoneRecipes(teste);
    }
  }, [activeFilter, originalData, setDoneRecipes]);

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
        className="done-buttons"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        name="food"
        onClick={ applyFilter }
        className="done-buttons"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        name="drink"
        onClick={ applyFilter }
        className="done-buttons"
      >
        Drinks
      </button>
    </div>
  );
}

export default DoneFilterButtons;
