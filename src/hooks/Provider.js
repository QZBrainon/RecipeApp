import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReceitasContext from './ReceitasContext';
import { ENDPOINT_DRINK, ENDPOINT_FOOD } from './endpoints';

function Provider({ children }) {
  const INITIAL_STATE = {
    foodData: [],
    drinksData: [],
  };

  const [recipesData, setRecipesData] = useState(INITIAL_STATE);
  const [foodsList, setFoodsList] = useState([]);
  const [drinksList, setDrinksList] = useState([]);

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

  const contextValue = {
    recipesData,
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
