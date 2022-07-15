import React from 'react';

function SearchBar() {
  return (
    <>
      <label htmlFor="ingredient">
        <input type="radio" name="searchBar" data-testid="ingredient-search-radio" />
        {' '}
        Ingredient
      </label>
      <label htmlFor="name">
        <input type="radio" id="name" data-testid="name-search-radio" />
        {' '}
        Name
      </label>
      <label htmlFor="first-letter">
        <input type="radio" data-testid="first-letter-search-radio" />
        {' '}
        First Letter
      </label>
      <button type="button" data-testid="exec-search-btn">Search</button>
    </>
  );
}

export default SearchBar;
