import React from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  return (
    <main>
      <Header />
      <button type="button" data-testid="filter-by-all-btn">
        All
      </button>
      <button type="button" data-testid="filter-by-food-btn">
        Food
      </button>
      <button type="button" data-testid="filter-by-drink-btn">
        Drinks
      </button>
    </main>
  );
}

export default FavoriteRecipes;
