import { useState, useEffect } from 'react';
import { ENDPOINT_DRINK, ENDPOINT_FOOD } from './endpoints';

function useOriginalData() {
  // const [loadingFoods, setLoadingFoods] = useState(false);
  // const [loadingDrinks, setLoadingDrinks] = useState(false);
  const [originalFoodList, setOriginalFoodList] = useState([]);
  const [originalDrinkList, setOriginalDrinkList] = useState([]);

  useEffect(() => {
    const fetchData = async (endpoint) => {
      // setLoadingFoods(true);
      const response = await fetch(endpoint);
      const data = await response.json();
      const dataKey = Object.keys(data);
      const value = data[dataKey[0]];
      setOriginalFoodList([...value]);
      // setLoadingFoods(false);
    };
    fetchData(ENDPOINT_FOOD);
  }, []);

  useEffect(() => {
    const fetchData = async (endpoint) => {
      // setLoadingDrinks(true);
      const response = await fetch(endpoint);
      const data = await response.json();
      const dataKey = Object.keys(data);
      const value = data[dataKey[0]];
      setOriginalDrinkList([...value]);
      // setLoadingDrinks(false);
    };
    fetchData(ENDPOINT_DRINK);
  }, []);

  const orginalData = {
    originalFoodList,
    originalDrinkList,
  };

  return orginalData;
}

export default useOriginalData;
