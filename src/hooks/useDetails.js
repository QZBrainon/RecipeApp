import { useContext, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { ENDPOINT_DETAIL_DRINK, ENDPOINT_DETAIL_FOOD } from './endpoints';
import ReceitasContext from './ReceitasContext';

function useDetails(actualPath) {
  const { setRecipeDetail } = useContext(ReceitasContext);
  const match = useRouteMatch();
  const { params: { id } } = match;

  useEffect(() => {
    const fetchDetails = async (endpoint, key) => {
      const response = await fetch(endpoint);
      const data = await response.json();
      const recipe = data[key][0];
      setRecipeDetail(recipe);
    };
    if (actualPath.includes('foods')) {
      const endpoint = ENDPOINT_DETAIL_FOOD + id;
      const key = 'meals';
      return fetchDetails(endpoint, key);
    }

    if (actualPath.includes('drinks')) {
      const endpoint = ENDPOINT_DETAIL_DRINK + id;
      const key = 'drinks';
      return fetchDetails(endpoint, key);
    }

    return console.log('erro');
  }, [actualPath, id, setRecipeDetail]);

}

export default useDetails;
