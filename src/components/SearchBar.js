import React, { useState } from 'react';

function SearchBar() {
  const INITIAL_SEARCH_INFO = {
    searchInput: '',
    radioInput: 'ingredient',
  };

  const [searchInfo, setSearchInfo] = useState(INITIAL_SEARCH_INFO);
  const { searchInput, radioInput } = searchInfo;

  const handleChange = ({ target: { name, value } }) => {
    setSearchInfo({
      ...searchInfo,
      [name]: value,
    });
  };

  return (
    <>
      <input
        type="text"
        data-testid="search-input"
        name="searchInput"
        onChange={ handleChange }
        value={ searchInput }
      />

      <button type="button" data-testid="exec-search-btn">Search</button>
      <br />

      <label htmlFor="ingredient">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="radioInput"
          onChange={ handleChange }
          value="ingredient"
          checked={ (radioInput === 'ingredient') }
        />
        {' '}
        Ingredient
      </label>

      <label htmlFor="name">
        <input
          type="radio"
          id="name"
          data-testid="name-search-radio"
          name="radioInput"
          onChange={ handleChange }
          value="name"
        />
        {' '}
        Name
      </label>

      <label htmlFor="first-letter">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="radioInput"
          onChange={ handleChange }
          value="first letter"
        />
        {' '}
        First Letter
      </label>

    </>
  );
}

export default SearchBar;
