import React from 'react';
import DoneFilterButtons from '../components/DoneFilterButtons';
import Header from '../components/Header';
import RenderDoneRecipes from '../components/RenderDoneRecipes';

function DoneRecipes() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <DoneFilterButtons />
        <RenderDoneRecipes />
      </main>
    </>
  );
}

export default DoneRecipes;
