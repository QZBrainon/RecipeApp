import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReceitasContext from './ReceitasContext';
import { ENDPOINT_DRINK, ENDPOINT_FOOD,
  ENDPOINT_CATEGORIES_FOODS, ENDPOINT_CATEGORIES_DRINKS } from './endpoints';

function Provider({ children }) {
  const INITIAL_STATE = {
    foodData: [],
    drinksData: [],
  };

  const [recipesData, setRecipesData] = useState(INITIAL_STATE);
  const [foodsList, setFoodsList] = useState([]);
  const [drinksList, setDrinksList] = useState([]);
  const [isSearchResult, setSearchResult] = useState(false);
  const [categoriesFoods, setCategoriesFoods] = useState([]);
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);

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

  useEffect(() => {
    const fetchCategoriesFoods = async (endpoint) => {
      const NUMBER_MAX = 5;
      const response = await fetch(endpoint);
      const data = await response.json();
      const categoryFoodsArr = [...data.meals].slice(0, NUMBER_MAX);
      setCategoriesFoods(categoryFoodsArr);
    };
    fetchCategoriesFoods(ENDPOINT_CATEGORIES_FOODS);
  }, []);

  useEffect(() => {
    const fetchCategoriesDrinks = async (endpoint) => {
      const NUMBER_MAX = 5;
      const response = await fetch(endpoint);
      const data = await response.json();
      const categoryDrinksArr = [...data.drinks].slice(0, NUMBER_MAX);
      setCategoriesDrinks(categoryDrinksArr);
    };
    fetchCategoriesDrinks(ENDPOINT_CATEGORIES_DRINKS);
  }, []);

  const contextValue = {
    recipesData,
    isSearchResult,
    setSearchResult,
    categoriesDrinks,
    categoriesFoods,
    setDrinksList,
    setFoodsList,
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
