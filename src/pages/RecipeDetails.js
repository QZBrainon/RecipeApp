import React from 'react';
import useActualPath from '../hooks/useActualPath';
import useDetails from '../hooks/useDetails';

function RecipeDetails() {
  const actualpath = useActualPath();
  useDetails(actualpath);

  return (
    <main>
      <h1>
        { actualpath }
      </h1>
    </main>
  );
}

export default RecipeDetails;
