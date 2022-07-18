import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RenderRecipes from '../components/RenderRecipes';
import ReceitasContext from '../hooks/ReceitasContext';

function Recipes() {
  const { recipesData } = useContext(ReceitasContext);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { location: { pathname } } = history;
  useEffect(() => {
    const { foodData, drinksData } = recipesData;
    if (pathname === '/foods') {
      return setLoading(
        (foodData.length === 0),
      );
    }
    if (pathname === '/drinks') {
      return setLoading(
        (drinksData.length === 0),
      );
    }
  }, [recipesData, pathname]);
  return (
    <div>
      <Header />
      {
        (loading)
          ? <h4>loading...</h4>
          : <RenderRecipes />
      }
      <Footer />
    </div>
  );
}

export default Recipes;
