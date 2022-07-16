import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RenderRecipes from '../components/RenderRecipes';

function Recipes() {
  const history = useHistory();
  console.log(history.location.pathname);
  return (
    <div>
      <Header />
      <RenderRecipes />
      <Footer />
    </div>
  );
}

export default Recipes;
