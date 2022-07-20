import React, { useContext } from 'react';
import ReceitasContext from '../hooks/ReceitasContext';
import useActualPath from '../hooks/useActualPath';
import useDetails from '../hooks/useDetails';

function RecipeDetails() {
  const actualpath = useActualPath();

  useDetails(actualpath);

  const { recipesData: { recipeInDetail } } = useContext(ReceitasContext);
  const objLength = Object.keys(recipeInDetail).length;
  console.log(recipeInDetail);

  return (
    <main>
      <div>
        {
          (objLength)
            ? <h1>teste1</h1>
            : <h1>loading...</h1>
        }
      </div>
    </main>
  );
}

export default RecipeDetails;
