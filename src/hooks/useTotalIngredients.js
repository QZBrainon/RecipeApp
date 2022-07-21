import { useEffect, useState, useContext } from 'react';
import ReceitasContext from './ReceitasContext';

function useTotalIngredients() {
  const { recipesData: { recipeInDetail } } = useContext(ReceitasContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const allKeys = Object
      .keys(recipeInDetail)
      .filter((item) => item.includes('strIngredient'))
      .map((item) => recipeInDetail[item])
      .filter((item) => item !== '' && item !== null);
    setTotal(allKeys.length);
  }, [setTotal, recipeInDetail]);

  return total;
}

export default useTotalIngredients;
