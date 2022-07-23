import React, { useContext, useState } from 'react';
import ReceitasContext from '../hooks/ReceitasContext';

function DoneFilterButtons() {
  const { setDoneRecipes, recipesData: { doneRecipes } } = useContext(ReceitasContext);
  const [activeFilter, setActiveFilter] = useState('all');
  console.log(doneRecipes);
  return (
    <div>
      <button type="button" data-testid="filter-by-all-btn" name="all">
        All
      </button>
      <button type="button" data-testid="filter-by-food-btn" name="food">
        Food
      </button>
      <button type="button" data-testid="filter-by-drink-btn" name="drinks">
        Drinks
      </button>
    </div>
  );
}

export default DoneFilterButtons;
