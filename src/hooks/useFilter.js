import { useContext } from 'react';
import ReceitasContext from './ReceitasContext';
import { ENDPOINT_FILTERCATEGORY_FOODS,
  ENDPOINT_FILTERCATEGORY_DRINKS } from './endpoints';

function useFilter() {
  const { setFoodsList, setDrinksList } = useContext(ReceitasContext);

  const fetchCategoriesFilterDrinks = async (endpoint, path) => {
    const response = await fetch(endpoint);
    const data = await response.json();
    const dataKey = Object.keys(data);
    const filterCategories = [...data[dataKey[0]]];
    if (path === '/foods') {
      setFoodsList(filterCategories);
    }
    if (path === '/drinks') {
      setDrinksList(filterCategories);
    }
  };

  function runFilter(value, path) {
    if (path === '/foods') {
      const endpoint = ENDPOINT_FILTERCATEGORY_FOODS + value;
      return fetchCategoriesFilterDrinks(endpoint, path);
    }
    const endpoint = ENDPOINT_FILTERCATEGORY_DRINKS + value;
    return fetchCategoriesFilterDrinks(endpoint, path);
  }

  const useFilterData = { runFilter };

  return useFilterData;
}

export default useFilter;
