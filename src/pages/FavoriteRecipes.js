import React from 'react';
import FavoriteFilterButtons from '../components/FavoriteFilterButtons';
import Header from '../components/Header';
import RenderFavoriteRecipes from '../components/RenderFavoriteRecipes';

function FavoriteRecipes() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <FavoriteFilterButtons />
        <RenderFavoriteRecipes />
      </main>
    </>
  );
}

export default FavoriteRecipes;
