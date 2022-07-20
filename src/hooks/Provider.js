import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReceitasContext from './ReceitasContext';
import { ENDPOINT_DRINK, ENDPOINT_FOOD,
  ENDPOINT_CATEGORIES_FOODS, ENDPOINT_CATEGORIES_DRINKS } from './endpoints';

function Provider({ children }) {
  const INITIAL_STATE = {
    foodData: [],
    drinksData: [],
    recipeInDetail: {},
  };

  const [recipesData, setRecipesData] = useState(INITIAL_STATE);
  const [foodsList, setFoodsList] = useState([]);
  const [drinksList, setDrinksList] = useState([]);
  const [isFilterResult, setFilterResult] = useState(false);
  const [categoriesFoods, setCategoriesFoods] = useState([]);
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);
  const [recipeDetail, setRecipeDetail] = useState({});

  useEffect(() => {
    const fetchData = async (endpoint) => {
      const response = await fetch(endpoint);
      const data = await response.json();
      const value = data.meals;
      setFoodsList([...value]);
    };
    fetchData(ENDPOINT_FOOD);
  }, []);

  useEffect(() => {
    const fetchData = async (endpoint) => {
      const response = await fetch(endpoint);
      const data = await response.json();
      const value = data.drinks;
      setDrinksList([...value]);
    };
    fetchData(ENDPOINT_DRINK);
  }, []);

  useEffect(() => {
    setRecipesData({
      foodData: foodsList,
      drinksData: drinksList,
      recipeInDetail: recipeDetail,
    });
  }, [foodsList, drinksList, recipeDetail]);

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
    isFilterResult,
    categoriesDrinks,
    categoriesFoods,
    recipeDetail,
    setDrinksList,
    setFoodsList,
    setFilterResult,
    setRecipeDetail,
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
