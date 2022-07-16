import React, { useContext } from 'react';
import ReceitasContext from '../hooks/ReceitasContext';

function RenderRecipes() {
  const { recipesData } = useContext(ReceitasContext);
  return <h1>Aqui a mágica acontece!</h1>;
}

export default RenderRecipes;
