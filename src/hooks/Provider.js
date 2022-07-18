import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReceitasContext from './ReceitasContext';
import { ENDPOINT_DRINK, ENDPOINT_FIRSTLTTER, ENDPOINT_FOOD,
  ENDPOINT_INGREDIENT, ENDPOINT_NAME } from './endpoints';

function Provider({ children }) {
  const INITIAL_STATE = {
    foodData: [],
    drinksData: [],
  };

  const [recipesData, setRecipesData] = useState(INITIAL_STATE);
  const [foodsList, setFoodsList] = useState([]);
  const [drinksList, setDrinksList] = useState([]);
  const [isSearchResult, setSearchResult] = useState(false);

  useEffect(() => {
    const fetchData = async (endpoint) => {
      const response = await fetch(endpoint);
      const data = await response.json();
      const dataKey = Object.keys(data);
      const value = data[dataKey[0]];
      setFoodsList([...value]);
    };
    fetchData(ENDPOINT_FOOD);
  }, []);

  useEffect(() => {
    const fetchData = async (endpoint) => {
      const response = await fetch(endpoint);
      const data = await response.json();
      const dataKey = Object.keys(data);
      const value = data[dataKey[0]];
      setDrinksList([...value]);
    };
    fetchData(ENDPOINT_DRINK);
  }, []);

  useEffect(() => {
    setRecipesData({
      foodData: foodsList,
      drinksData: drinksList,
    });
  }, [foodsList, drinksList]);

  function runSearch({ searchInput, radioInput }, pathname) {
    // const searchTerm = searchInput.replace(/\s/g, '%20');
    // const letterEndpoint = ENDPOINT_FIRSTLTTER + searchTerm;
    // const nameEndpoint = ENDPOINT_NAME + searchTerm;
    // const ingredientEndpoint = ENDPOINT_INGREDIENT + searchTerm;

    // if (pathname === '/foods') {
    //   switch (radioInput) {
    //   case ('first letter'):
    //     return console.log(letterEndpoint);
    //   case ('name'):
    //     return console.log(nameEndpoint);
    //   default:
    //     return console.log(ingredientEndpoint);
    //   }
    // }
  }

  const contextValue = {
    recipesData,
    runSearch,
    isSearchResult,
    setSearchResult,
  };

  return (
    <ReceitasContext.Provider value={ contextValue }>
      {children}
    </ReceitasContext.Provider>);
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
