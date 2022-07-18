import { useContext } from 'react';
import { ENDPOINT_FIRSTLTTER, ENDPOINT_NAME, ENDPOINT_INGREDIENT,
  ENDPOINT_DRINK_FSL, ENDPOINT_DRINK_ING, ENDPOINT_DRINK_NAM } from './endpoints';
import ReceitasContext from './ReceitasContext';

function useSearch() {
  const { setFoodsList, setDrinksList } = useContext(ReceitasContext);

  const fetchData = async (endpoint, pathname) => {
    const response = await fetch(endpoint);
    const data = await response.json();
    const dataKey = Object.keys(data);
    const value = data[dataKey[0]];
    if (pathname === '/foods') {
      setFoodsList([...value]);
    }
    if (pathname === '/drinks') {
      setDrinksList([...value]);
    }
  };

  function runSearch({ searchInput, radioInput }, pathname) {
    const searchTerm = searchInput.replace(/\s/g, '%20');
    const foodLetterEP = ENDPOINT_FIRSTLTTER + searchTerm;
    const foodNameEP = ENDPOINT_NAME + searchTerm;
    const foodIngredientEP = ENDPOINT_INGREDIENT + searchTerm;

    const drinkLetterEP = ENDPOINT_DRINK_FSL + searchTerm;
    const drinkNameEP = ENDPOINT_DRINK_NAM + searchTerm;
    const drinkIngredientEP = ENDPOINT_DRINK_ING + searchTerm;

    if (pathname === '/foods') {
      switch (radioInput) {
      case ('first letter'):
        return fetchData(foodLetterEP, pathname);
      case ('name'):
        return fetchData(foodNameEP, pathname);
      default:
        return fetchData(foodIngredientEP, pathname);
      }
    }

    if (pathname === '/drinks') {
      switch (radioInput) {
      case ('first letter'):
        return fetchData(drinkLetterEP, pathname);
      case ('name'):
        return fetchData(drinkNameEP, pathname);
      default:
        return fetchData(drinkIngredientEP, pathname);
      }
    }
  }

  const useSearchData = { runSearch };

  return useSearchData;
}

export default useSearch;
